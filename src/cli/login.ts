import { Result } from "meow";
import * as cliParser from "../utils/cliParser";
import * as user from "../user";

export const name = "login";
export const description = "";
export const command = async (cli: Result) => {
  try {
    const { username, password } = await cliParser.parseAuthInfo(cli);
    if (!username || !password) {
      process.stderr.write("Miss username or password");
      process.exit();
    }
    await user.loginWithPassword(username, password);
    process.stdout.write("success");
  } catch (err) {
    process.stderr.write(err.message || "login failed");
  }
};
