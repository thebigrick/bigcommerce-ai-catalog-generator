import getOpenAi from "./get-open-ai";
import getAssistantConfig from "../config/get-assistant-config";

/**
 * Build assistant
 */
const updateAssistant = async (assistantId: string) => {
  const openAi = getOpenAi();

  const oiAssistant = await openAi.beta.assistants.update(
    assistantId,
    getAssistantConfig(),
  );

  return oiAssistant.id;
};

export default updateAssistant;
