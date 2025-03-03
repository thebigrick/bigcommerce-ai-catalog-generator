import getOpenAi from "./get-open-ai";
import runAiCommand from "./run-ai-command";
import getProject from "./get-project";
import getChannelLocales from "./get-channel-locales";

const generateCatalog = async (assistantId: string, projectName: string) => {
  const openAi = getOpenAi();
  const thread = await openAi.beta.threads.create();
  const project = getProject(projectName);

  const locales = await getChannelLocales();

  await runAiCommand(
    project,
    assistantId,
    thread.id,
    `The store description is: ${project.storeDescription}. Locales: ${locales.join(", ")}. Retrieve the current categories and just list them.`,
  );

  await runAiCommand(
    project,
    assistantId,
    thread.id,
    `If there are less than ${project.catalog.categoriesCount} root categories, create new ones to reach such number or skip this step if there are enough and reply with OK.`,
  );

  await runAiCommand(
    project,
    assistantId,
    thread.id,
    `Generate ${project.catalog.productsCount} products using a single function call to "add_products".`,
  );
};

export default generateCatalog;
