import { ICategory, IProject } from "../../types";
import restClient from "./rest-client";
import getCategoryTreeId from "./get-category-tree-id";

const createCategories = async (project: IProject, categories: ICategory[]) => {
  const treeId = await getCategoryTreeId();

  const payload = categories.map((category) => ({
    name: category.name,
    description: category.description,
    tree_id: treeId,
    is_visible: true,
  }));

  const res = await restClient(
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
