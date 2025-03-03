import * as dotenv from "dotenv";
import updateAssistant from "../service/update-assistant";
import buildAssistant from "../service/build-assistant";
import fs from "node:fs";

dotenv.config();
dotenv.config({ path: ".env.local" });

const OPENAI_ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

const setupOpenAiAssistant = async () => {
  if (!OPENAI_ASSISTANT_ID) {
    console.log(`No OpenAI assistant ID found. Building a new assistant...`);
    const newId = await buildAssistant();

    console.log("Adding the following line to your .env.local file:");
    console.log("");
    console.log(`OPENAI_ASSISTANT_ID=${newId}`);

    fs.writeFileSync(".env.local", `OPENAI_ASSISTANT_ID=${newId}\n`, {
      flag: "a",
    });
  } else {
    console.log(`Updating assistant with ID: ${OPENAI_ASSISTANT_ID}`);
    await updateAssistant(OPENAI_ASSISTANT_ID);
  }
};

(async () => {
  await setupOpenAiAssistant();

  console.log(`Done.`);
})();
