import { ICategory, IProject } from "../../types";
import getCategories from "../bigcommerce/get-categories";

const handleGetCategories = async (project: IProject): Promise<ICategory[]> => {
  console.log("get_categories:");
  const res = await getCategories();
  for (const category of res) {
    console.log(`\t${category.name}`);
  }
  return res;
};

export default handleGetCategories;
