import { IActionResponse, IProject } from "../../types";
import createProducts from "../bigcommerce/create-products";

const handleAddProducts = async (
  project: IProject,
  res: any,
): Promise<IActionResponse> => {
  for (const product of res) {
    console.log(`\t${product.name}`);
  }

  await createProducts(project, res);

  return { success: true };
};

export default handleAddProducts;
