import { IProduct, IProject } from "../../types";
import bigcommerceClient from "./bigcommerce-client";
import getCategories from "./get-categories";
import generateImage from "../thehiveai/generate-image";

const createProducts = async (
  project: IProject,
  products: IProduct[],
): Promise<void> => {
  console.log("Creating products:");
  const categories = await getCategories();

  const seed = project.images.seed ?? Math.floor(Math.random() * 1000);
  console.log(`Using seed for images generation: ${seed}`);

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

  const productIds = [];

  for (const product of products) {
    const categoryId = categoryIdsByName[product.category];

    console.log(`\t${product.name}`);
    const imageUrls = await generateImage(
      project,
      `${product.name}: ${product.description}`,
      seed,
    );

    const payload = {
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: product.price,
      type: "physical",
      categories: [categoryId],
      images: imageUrls.map((url, index) => ({
        image_url: url,
        description: product.description,
        is_thumbnail: index === 0,
        sort_order: index,
      })),
      weight: 1,
    };

    const res = await bigcommerceClient(
      "POST",
      "/catalog/products",
      {},
      payload,
    );

    if (res.errors) {
      console.error(
        `Failed to create product ${product.sku}: ${res.errors.name}`,
      );
      continue;
    }

    productIds.push(res.data.id);
  }

  const assignPayload = productIds.map((id) => ({
    product_id: id,
    channel_id: 1,
  }));

  await bigcommerceClient(
    "PUT",
    "/catalog/products/channel-assignments",
    {},
    assignPayload,
  );
};

export default createProducts;
