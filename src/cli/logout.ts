import { Result } from "meow";
import { getUserData, removeUserData } from "../utils/userData";

export const name = "logout";
export const description = "logout";
export const command = async (cli: Result) => {
  const userDataPath = getUserData();
  try {
    if (cli.flags.force) {
      // manual
      removeUserData();
      process.stdout.write("Logout success");
    } else {
      process.stdout.write(`Execute the below command manually\nrm -rf ${userDataPath} manually`);
    }
  } catch (err) {
    process.stderr.write((err.message || "login failed") + "\n");
  }
};
