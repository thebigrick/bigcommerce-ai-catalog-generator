import { FunctionTool } from "openai/resources/beta";

const addCategories = (): FunctionTool => ({
  type: "function",
  function: {
    name: "add_categories",
    description: "Add categories to the catalog",
    strict: true,
    parameters: {
      type: "object",
      properties: {
        categories: {
          type: "array",
          description: "List of categories",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Category name",
              },
              description: {
                type: "string",
                description: "Category description",
              },
            },
            additionalProperties: false,
            required: ["name", "description"],
          },
        },
      },
      additionalProperties: false,
      required: ["categories"],
    },
  },
});

export default addCategories;
