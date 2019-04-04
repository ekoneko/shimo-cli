import { Result } from "meow";
const open = require("open");

export const name = ["open"];
export const description = "Display current user info";
export const command = async (cli: Result) => {
  open(getPage(cli.input[1]));
};

function getPage(guid?: string) {
  const baseUrl = process.env.APP_URL!;
  if (guid && guid.match(/[a-z0-9]{16}/i)) {
    return `${baseUrl}/${guid}`;
  }
  return baseUrl;
}
