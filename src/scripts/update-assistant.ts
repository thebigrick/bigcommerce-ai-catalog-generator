import * as dotenv from "dotenv";
import updateAssistant from "../service/update-assistant";

dotenv.config();
dotenv.config({ path: ".env.local" });

const OPENAI_ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

if (!OPENAI_ASSISTANT_ID) {
  throw new Error(`An OpenAI assistant ID is not set.`);
}

(async () => {
  await updateAssistant(OPENAI_ASSISTANT_ID);
  console.log(`Done.`);
})();
