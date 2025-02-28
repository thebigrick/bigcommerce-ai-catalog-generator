import * as dotenv from "dotenv";
import generateCatalog from "../service/generate-catalog";

dotenv.config();
dotenv.config({ path: ".env.local" });

const OPENAI_ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

if (!OPENAI_ASSISTANT_ID) {
  throw new Error(`An OpenAI assistant ID is not set.`);
}

const project = process.argv[2];
if (!project) {
  console.log("Usage: npm catalog:generate <project>");
  process.exit(1);
}

(async () => {
  await generateCatalog(OPENAI_ASSISTANT_ID, project);
})();
