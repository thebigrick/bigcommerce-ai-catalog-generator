import restClient from "./rest-client";
import getCategoryTreeId from "./get-category-tree-id";

const getCategories = async (): Promise<any> => {
  const threeId = await getCategoryTreeId();

  const res = await restClient("GET", "/catalog/trees/categories", {
    "tree_id:in": String(threeId),
  });

  if (res.errors) {
    throw new Error("Failed to create categories: " + res.errors.title);
  }

  return res.data;
};

export default getCategories;
