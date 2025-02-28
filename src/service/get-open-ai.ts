import OpenAI from "openai";

let openAi: OpenAI | undefined = undefined;

/**
 * Get OpenAI instance
 */
const getOpenAi = (): OpenAI => {
  if (openAi === undefined) {
    openAi = new OpenAI();
  }

  return openAi;
};

export default getOpenAi;
