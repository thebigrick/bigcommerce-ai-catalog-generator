import { IActionResponse, ICategory, IProject } from "../../types";
import createCategories from "../bigcommerce/create-categories";

const handleAddCategories = async (
  project: IProject,
  res: ICategory[],
): Promise<IActionResponse> => {
  for (const category of res) {
    console.log(`\t${category.name}`);
  }

  await createCategories(project, res);

  return { success: true };
};

export default handleAddCategories;
