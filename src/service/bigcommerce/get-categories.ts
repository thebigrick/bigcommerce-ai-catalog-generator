import { ICategory } from "../../types";
import bigcommerceClient from "./bigcommerce-client";

const getCategories = async (): Promise<any> => {
  const res = await bigcommerceClient("GET", "/catalog/trees/categories", {
    "tree_id:in": "1",
  });

  if (res.errors) {
    throw new Error("Failed to create categories: " + res.errors.title);
  }

  return res.data;
};

export default getCategories;
