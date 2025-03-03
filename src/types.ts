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

export interface ILocalizableProductFields {
  locale: string;
  name: string;
  description: string;
}

export interface IProduct {
  sku: string;
  localizableFields: Array<ILocalizableProductFields>;
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
