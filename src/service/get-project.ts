import { IProject } from "../types";
import fs from "node:fs";
import * as path from "node:path";

const getProject = (projectName: string): IProject => {
  const projectsPath = path.join(__dirname, "..", "projects");
  const projectFile = `${projectsPath}/${projectName}.json`;

  if (!fs.existsSync(projectFile)) {
    throw new Error(`Project ${projectName} not found`);
  }

  const fileContent = fs.readFileSync(projectFile, "utf-8");

  // TODO: Do some validation here

  return JSON.parse(fileContent);
};

export default getProject;
