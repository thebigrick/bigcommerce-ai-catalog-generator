import { IActionResponse, IProject } from "../../types";
import createProducts from "../bigcommerce/create-products";

const handleAddProducts = async (
  project: IProject,
  res: any,
): Promise<IActionResponse> => {
  console.log("add_products:");
  for (const product of res) {
    console.log(`\t${product.sku}`);
  }

  await createProducts(project, res);

  return { success: true };
};

export default handleAddProducts;
