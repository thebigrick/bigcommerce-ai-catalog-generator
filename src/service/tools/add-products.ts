import { FunctionTool } from "openai/resources/beta";

const addProducts = (): FunctionTool => ({
  type: "function",
  function: {
    name: "add_products",
    description: "Add products to the catalog",
    strict: true,
    parameters: {
      type: "object",
      properties: {
        products: {
          type: "array",
          description: "List of products",
          items: {
            type: "object",
            properties: {
              sku: {
                type: "string",
                description: "Product SKU",
              },
              name: {
                type: "string",
                description: "Product name",
              },
              description: {
                type: "string",
                description: "Product description",
              },
              category: {
                type: "string",
                description: "Product category",
              },
              price: {
                type: "number",
                description: "Product price",
              },
            },
            additionalProperties: false,
            required: ["sku", "name", "description", "category", "price"],
          },
        },
      },
      additionalProperties: false,
      required: ["products"],
    },
  },
});

export default addProducts;
