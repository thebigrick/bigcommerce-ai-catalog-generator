import getOpenAi from "./get-open-ai";
import assistantConfig from "../config/assistant-config";
import getAssistant from "./get-assistant";

/**
 * Build assistant
 */
const buildAssistant = async () => {
  const openAi = getOpenAi();
  const oiAssistant = await openAi.beta.assistants.create(assistantConfig);

  return oiAssistant.id;
};

export default buildAssistant;
