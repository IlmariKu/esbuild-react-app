#!/usr/bin/env node
const chalk = require("chalk");
const funcs = require("./funcs");

const templates = {
  js: `IlmariKu/esbuild-react-app-template-js`,
  ts: `IlmariKu/esbuild-react-app-template-js`,
};

const main = async () => {
  console.log(`${chalk.bgMagenta(chalk.cyanBright("  ESBUILD REACT APP  "))}`);

  const args = require("yargs").argv;
  const projectLocation = args._[0];
  const projectType = args.ts ? "ts" : "js";

  await funcs.validateParams(projectLocation);
  const { projectPath, projectName } = await funcs.processParams(
    projectLocation,
  );
  const templateLocation = projectType === "ts" ? templates.ts : templates.js;
  await funcs.createFolder(projectPath);
  await funcs.downloadTemplate(templates.js, projectPath);
  await funcs.updateProjectFiles(projectPath, projectName);
  await funcs.notifyUser(projectPath, projectName);
};

main();
