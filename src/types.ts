export interface IAssistantResponse {
  message: string;
}

export interface IActionResponse {
  success: boolean;
}

export interface ICategory {
  name: string;
  description: string;
}

export interface IProduct {
  sku: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface IProject {
  storeDescription: string;
  images: {
    model: string;
    inferenceSteps: number;
    perProduct: number;
    additionalPrompt: string;
    negativePrompt: string;
    guidanceScale: number;
    seed?: number;
  };
  catalog: {
    productsCount: number;
    categoriesCount: number;
  };
}
