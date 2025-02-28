import { ICategory, IProject } from "../../types";
import bigcommerceClient from "./bigcommerce-client";

const createCategories = async (project: IProject, categories: ICategory[]) => {
  const payload = categories.map((category) => ({
    name: category.name,
    description: category.description,
    tree_id: 1,
    is_visible: true,
  }));

  const res = await bigcommerceClient(
    "POST",
    "/catalog/trees/categories",
    {},
    payload,
  );

  if (res.errors) {
    throw new Error("Failed to create categories: " + res.errors.title);
  }
};

export default createCategories;
