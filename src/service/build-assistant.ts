import getOpenAi from "./get-open-ai";
import getAssistantConfig from "../config/get-assistant-config";
import getAssistant from "./get-assistant";

/**
 * Build assistant
 */
const buildAssistant = async () => {
  const openAi = getOpenAi();
  const oiAssistant = await openAi.beta.assistants.create(getAssistantConfig());

  return oiAssistant.id;
};

export default buildAssistant;
