import getOpenAi from "./get-open-ai";
import runAiCommand from "./run-ai-command";
import getProject from "./get-project";

const generateCatalog = async (assistantId: string, projectName: string) => {
  const openAi = getOpenAi();
  const thread = await openAi.beta.threads.create();
  const project = getProject(projectName);

  await runAiCommand(
    project,
    assistantId,
    thread.id,
    "The store description is: " +
      project.storeDescription +
      ". Retrieve the current categories.",
  );
  await runAiCommand(
    project,
    assistantId,
    thread.id,
    `Generate a maximum of ${project.catalog.categoriesCount} categories if needed`,
  );
  await runAiCommand(
    project,
    assistantId,
    thread.id,
    `Generate ${project.catalog.productsCount} products`,
  );
};

export default generateCatalog;
