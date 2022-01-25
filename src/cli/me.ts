import { Result } from "meow";
import { get } from "lodash";
import { format, FormatType } from "../utils/format";
import * as user from "../user";

export const name = ["me", "default"];
export const description = "Display current user info";
export const flags = <const>{
  format: {
    type: "string",
    default: "text",
  },
};
export const command = async (cli: Result<typeof flags>) => {
  const userInfo = await user.info();
  const key = cli.input[1];
  const result = key ? get(userInfo, key, "") : userInfo;
  format(result, cli.flags.format as FormatType);
};
