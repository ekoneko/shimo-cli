import * as fs from "fs";
import * as path from "path";
import { homedir } from "os";
import * as dotenv from "dotenv";
import { sync as mkdirpSync } from "mkdirp";
import { ask } from "./utils/input";
import { format, FormatType } from './utils/format'

const VERSION = "1";

function didUseLocalConf() {
  const basePath = process.cwd();
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  try {
    const pkg = require(path.join(basePath, "package.json"));
    return pkg.name === "shimo-cli";
  } catch (err) {
    return false;
  }
}

function createGenerateConfLine(created = false) {
  return async (name: string, value: string, askMode = false, askDefaultValue?: string) => {
    if (created || !process.env[name]) {
      if (askMode) {
        const tip = name + (askDefaultValue ? `(${askDefaultValue})` : "") + ':';
        return ((await ask(tip)) || askDefaultValue) as string;
      }
      return value;
    }
    return process.env[name] || value;
  };
}

async function generateConf(created = false) {
  const generateConfLine = createGenerateConfLine(created);
  process.env.APP_CLIENT_ID = await generateConfLine("APP_CLIENT_ID", "", true);
  process.env.APP_CLIENT_SECRET = await generateConfLine("APP_CLIENT_SECRET", "", true);
  const defaultUserData = path.join(homedir(), ".shimocli");
  process.env.USER_DATA = await generateConfLine("USER_DATA", "", true, defaultUserData);
  process.env.APP_URL = await generateConfLine("APP_URL", "https://shimo.im");
  process.env.API_URL = await generateConfLine("API_URL", "https://shimo.im/lizard-api");
  process.env.WS_URL = await generateConfLine("WS_URL", "wss://ws.shimo.im");
  process.env.CONTENT_HEADER_META_PREFIX = await generateConfLine(
    "CONTENT_HEADER_META_PREFIX",
    "x-oss-meta-",
  );

  return {
    APP_CLIENT_ID: process.env.APP_CLIENT_ID,
    APP_CLIENT_SECRET: process.env.APP_CLIENT_SECRET,
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
    CONTENT_HEADER_META_PREFIX: process.env.CONTENT_HEADER_META_PREFIX,
    USER_DATA: process.env.USER_DATA,
    VERSION: VERSION,
  };
}

function configToString(conf: { [key: string]: string }) {
  let result = "";
  for (let i in conf) {
    result += `${i}=${conf[i]}\n`;
  }
  return result;
}

async function initConf(homePath: string) {
  process.stdout.write("welcome to shimo-cli, init now...\n");
  const template = await generateConf(true);
  mkdirpSync(template.USER_DATA);
  fs.writeFileSync(homePath, configToString(template));
  process.stdout.write(`\nHere is your config (in ${homePath}):\n`);
  format(template, FormatType.TEXT)
  process.stdout.write(
    "The session will exit. You can redo your command or modify your config manually\n",
  );
  process.exit();
}

function shouldUpdateConf() {
  return process.env.VERSION !== VERSION;
}

async function updateConf(homePath: string) {
  process.stdout.write("config should be updated...\n");
  const template = await generateConf(false);
  fs.writeFileSync(homePath, configToString(template));
  process.stdout.write("updated\n");
}

async function getConfPath() {
  if (didUseLocalConf()) {
    const basePath = process.cwd();
    const confPath = path.join(basePath, ".env.local");
    if (fs.existsSync(confPath)) {
      return confPath;
    }
  }
  const homePath = path.join(homedir(), ".shimoclirc");
  if (!fs.existsSync(homePath)) {
    await initConf(homePath);
  }
  return homePath;
}

export async function config() {
  const confPath = await getConfPath();
  dotenv.config({
    path: confPath,
  });
  if (shouldUpdateConf()) {
    updateConf(confPath);
  }
}
