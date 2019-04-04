import { Result } from "meow";
import * as cliParser from "../utils/cliParser";
import * as user from "../user";

export const name = "login";
export const description = "login with email/mobile and password";
export const command = async (cli: Result) => {
  try {
    const { username, password } = await cliParser.parseAuthInfo(cli);
    if (!username || !password) {
      process.stderr.write("Missing username or password\n");
      process.exit();
    }
    await user.loginWithPassword(username, password);
    process.stdout.write("success\n");
  } catch (err) {
    process.stderr.write((err.message || "login failed") + "\n");
  }
};
