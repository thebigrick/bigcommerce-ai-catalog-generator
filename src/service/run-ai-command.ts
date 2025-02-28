import getOpenAi from "./get-open-ai";
import { Run, TextContentBlock } from "openai/resources/beta/threads";
import { IAssistantResponse, IProject } from "../types";
import handleAddProducts from "./actions/handle-add-products";
import handleAddCategories from "./actions/handle-add-categories";
import handleGetCategories from "./actions/handle-get-categories";

const handleRequiresAction = async (
  project: IProject,
  run: Run,
  threadId: string,
): Promise<IAssistantResponse> => {
  const openai = getOpenAi();
  const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls || [];
  const toolOutputs = toolCalls.map(async (tool) => {
    const rawArgs = JSON.parse(tool.function.arguments);
    const fnName = tool.function.name;

    if (fnName === "add_products") {
      const res = await handleAddProducts(project, rawArgs.products);
      return {
        tool_call_id: tool.id,
        output: JSON.stringify(res),
      };
    }

    if (fnName === "add_categories") {
      const res = await handleAddCategories(project, rawArgs.categories);
      return {
        tool_call_id: tool.id,
        output: JSON.stringify(res),
      };
    }

    if (fnName === "get_categories") {
      const res = await handleGetCategories(project);
      return {
        tool_call_id: tool.id,
        output: JSON.stringify(res),
      };
    }

    return {
      tool_call_id: tool.id,
      output: JSON.stringify({
        success: false,
        errorMessage: `Unknown function ${fnName}`,
      }),
    };
  }) as any[];

  const submitRun = await openai.beta.threads.runs.submitToolOutputsAndPoll(
    threadId,
    run.id,
    {
      tool_outputs: await Promise.all(toolOutputs),
    },
    {
      pollIntervalMs: 500,
    },
  );

  const res = await handleRunStatus(project, submitRun, threadId);
  return {
    message: res.message,
  };
};

const handleRunStatus = async (
  project: IProject,
  run: Run,
  threadId: string,
): Promise<IAssistantResponse> => {
  const openai = getOpenAi();

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(threadId);

    return {
      message: (messages.data[0].content[0] as TextContentBlock).text.value,
    };
  } else if (run.status === "requires_action") {
    return await handleRequiresAction(project, run, threadId);
  } else {
    console.error("Run did not complete:", run);
  }

  return {
    message: "Error",
  };
};

const runAiCommand = async (
  project: IProject,
  assistantId: string,
  threadId: string,
  command: string,
): Promise<IAssistantResponse> => {
  console.log(`> ${command}`);
  const openAi = getOpenAi();
  await openAi.beta.threads.messages.create(threadId, {
    role: "user",
    content: command,
  });

  const run = await openAi.beta.threads.runs.createAndPoll(
    threadId,
    {
      assistant_id: assistantId,
    },
    {
      pollIntervalMs: 1000,
    },
  );

  return await handleRunStatus(project, run, threadId);
};

export default runAiCommand;
