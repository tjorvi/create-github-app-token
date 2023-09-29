// @ts-check

import core from "@actions/core";
import { createAppAuth } from "@octokit/auth-app";

import { main } from "./lib/main.js";
import request from "./lib/request.js";

const appId = core.getInput("app_id");
const privateKey = core.getInput("private_key");
const repository = core.getInput("app_id") || process.env.GITHUB_REPOSITORY;
if (!repository) {
  throw new Error("GITHUB_REPOSITORY missing, must be set to '<owner>/<repo>', or pass in the repository setting");
}

main(
  appId,
  privateKey,
  repository,
  core,
  createAppAuth,
  request.defaults({
    baseUrl: process.env["GITHUB_API_URL"],
  })
).catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});
