import * as dotenv from "dotenv";
import buildAssistant from "../service/build-assistant";

dotenv.config();
dotenv.config({ path: ".env.local" });

const OPENAI_ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

if (OPENAI_ASSISTANT_ID !== undefined) {
  throw new Error(`An OpenAI assistant ID is set: ${OPENAI_ASSISTANT_ID}`);
}

(async () => {
  const newId = await buildAssistant();
  console.log("Add the following line to your env:");
  console.log("");
  console.log(`OPENAI_ASSISTANT_ID=${newId}`);
})();
