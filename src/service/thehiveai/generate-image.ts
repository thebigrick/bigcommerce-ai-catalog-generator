import thehiveClient from "./thehiveai-client";
import { IProject } from "../../types";

const generateImage = async (
  project: IProject,
  prompt: string,
  seed: number,
): Promise<string[]> => {
  const steps = project.images.inferenceSteps;
  const model = project.images.model;

  const payload = {
    input: {
      prompt: `${prompt}.${project.images.additionalPrompt}`,
      negative_prompt: project.images.negativePrompt,
      image_size: { width: 1024, height: 1024 },
      num_inference_steps: steps,
      guidance_scale: project.images.guidanceScale,
      num_images: project.images.perProduct,
      seed,
      output_format: "jpeg",
      output_quality: 90,
    },
  };

  const res = await thehiveClient("POST", `/${model}`, {}, payload);
  return res.output.map((o: { url: string }) => {
    const u = new URL(o.url);
    u.search = "";
    return u.toString();
  });
};

export default generateImage;
