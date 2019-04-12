import { Result } from "meow";
import { get } from "lodash";
import { format } from "../utils/format";
import * as user from "../user";

export const name = ["me", "default"];
export const description = "Display current user info";
export const command = async (cli: Result) => {
  const userInfo = await user.info();
  const key = cli.input[1];
  const result = key ? get(userInfo, key, "") : userInfo;
  format(result, cli.flags.format);
};
