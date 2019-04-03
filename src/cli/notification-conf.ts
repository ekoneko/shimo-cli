import { Result } from "meow";
import * as notification from "../notification";
import { format } from "../utils/format";

export const name = ["notification", "conf"];
export const description = "";
export const command = async (cli: Result) => {
  const subCommand = cli.input[2].toLocaleLowerCase();
  switch (subCommand) {
    case "set":
      await notification.setConf();
      break;
    case "list":
    default:
      const result = await notification.getConf();
      process.stdout.write(format(result, cli.flags.format));
  }
};
