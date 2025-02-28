import getOpenAi from "./get-open-ai";
import assistantConfig from "../config/assistant-config";

/**
 * Build assistant
 */
const updateAssistant = async (assistantId: string) => {
  const openAi = getOpenAi();

  const oiAssistant = await openAi.beta.assistants.update(
    assistantId,
    assistantConfig,
  );

  return oiAssistant.id;
};

export default updateAssistant;
