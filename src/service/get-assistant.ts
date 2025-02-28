import { Assistant } from "openai/resources/beta";
import getOpenAi from "./get-open-ai";

let assistant: Assistant | undefined = undefined;

/**
 * Get assistant by its ID
 * @param assistantId
 */
const getAssistant = async (assistantId: string) => {
  if (assistant === undefined) {
    const openAi = getOpenAi();
    assistant = await openAi.beta.assistants.retrieve(assistantId);
  }

  return assistant;
};

export default getAssistant;
