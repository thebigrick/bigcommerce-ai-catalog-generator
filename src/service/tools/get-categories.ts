import { FunctionTool } from "openai/resources/beta";

const getCategories = (): FunctionTool => ({
  type: "function",
  function: {
    name: "get_categories",
    description: "Get categories from the catalog",
  },
});

export default getCategories;
