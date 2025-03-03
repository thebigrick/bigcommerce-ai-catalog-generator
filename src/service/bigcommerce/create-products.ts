import { IProduct, IProject } from "../../types";
import restClient from "./rest-client";
import getCategories from "./get-categories";
import generateImage from "../thehiveai/generate-image";
import getChannelLocales from "../get-channel-locales";
import batchPromise from "../batch-promise";
import { graphql } from "gql.tada";
import graphqlClient from "./graphql-client";

const TranslateMutation = graphql(`
  mutation TranslateMutation($input: SetProductBasicInformationInput!) {
    product {
      setProductBasicInformation(input: $input) {
        product {
          id
        }
      }
    }
  }
`);

const localizeProduct = async (
  productId: number,
  localizableFields: { locale: string; name: string; description: string }[],
  channelId: number,
  locales: string[],
): Promise<void> => {
  const promises: Promise<void>[] = [];

  // The first locale is the default one, non need to translate it
  for (let i = 1; i < locales.length; i++) {
    const localeTranslation = localizableFields.find(
      (field) => field.locale === locales[i],
    );

    if (!localeTranslation) {
      console.error(
        `Failed to find locale information for product ${productId} and locale ${locales[i]}`,
      );
      continue;
    }

    promises.push(
      graphqlClient(TranslateMutation, {
        input: {
          productId: `bc/store/product/${productId}`,
          localeContext: {
            channelId: `bc/store/channel/${channelId}`,
            locale: locales[i],
          },
          data: {
            name: localeTranslation.name,
            description: localeTranslation.description,
          },
        },
      }),
    );
  }

  await Promise.all(promises);
};

const createProducts = async (
  project: IProject,
  products: IProduct[],
): Promise<void> => {
  console.log("Creating products:");

  const productsBatchSize = parseInt(
    process.env.PRODUCTS_BATCH_SIZE || "2",
    10,
  );

  const channelId = parseInt(process.env.BIGCOMMERCE_CHANNEL_ID || "0", 10);
  if (!channelId) {
    throw new Error("BIGCOMMERCE_CHANNEL_ID is not set.");
  }

  const categories = await getCategories();

  // Map category names to category IDs
  const categoryIdsByName: Record<string, number> = categories.reduce(
    (
      acc: Record<string, number>,
      category: { name: string; category_id: number },
    ) => {
      acc[category.name] = category.category_id;
      return acc;
    },
    {},
  );

  const productIds: number[] = [];
  const locales = await getChannelLocales();
  const defaultLocale = locales[0];

  const seed = project.images.seed ?? Math.floor(Math.random() * 1000);
  console.log(`Using seed for images generation: ${seed}`);

  const createProduct = async (product: IProduct): Promise<void> => {
    const defaultInformation = product.localizableFields.find(
      (f) => f.locale === defaultLocale,
    );
    if (!defaultInformation) {
      console.error(
        `Failed to find default locale information for product ${product.sku}`,
      );
      return;
    }

    const categoryId = categoryIdsByName[product.category];

    console.log(`\t${product.sku}`);
    const imageUrls = await generateImage(
      project,
      `${defaultInformation.name}: ${defaultInformation.description}`,
      seed,
    );

    const payload = {
      sku: product.sku,
      name: defaultInformation.name,
      description: defaultInformation.description,
      price: product.price,
      type: "physical",
      categories: [categoryId],
      images: imageUrls.map((url, index) => ({
        image_url: url,
        description: defaultInformation.description,
        is_thumbnail: index === 0,
        sort_order: index,
      })),
      weight: 1,
    };

    const res = await restClient("POST", "/catalog/products", {}, payload);

    if (res.errors) {
      console.error(
        `Failed to create product ${product.sku}: ${res.errors.name}`,
      );
      return;
    }

    await localizeProduct(
      res.data.id,
      product.localizableFields,
      channelId,
      locales,
    );

    productIds.push(res.data.id);
  };

  // Batch products creation
  const promises = products.map((p) => createProduct(p));
  await batchPromise(promises, productsBatchSize);

  // Assign products to the channel
  const assignPayload = productIds.map((id) => ({
    product_id: id,
    channel_id: channelId,
  }));

  await restClient(
    "PUT",
    "/catalog/products/channel-assignments",
    {},
    assignPayload,
  );
};

export default createProducts;
