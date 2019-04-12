import { Result } from "meow";
import * as notification from "../notification";
import { format } from "../utils/format";

export const name = ["notification", "conf"];
export const description = [
  "set or list notification config",
  "shimo-cli notification conf list\tget notification config list",
  "shimo-cli notification conf set \tset notification config list",
].join("\n\t");
export const command = async (cli: Result) => {
  const subCommand = cli.input[2].toLocaleLowerCase();
  switch (subCommand) {
    case "set":
      await notification.setConf();
      break;
    case "list":
    default:
      const result = await notification.getConf();
      format(result, cli.flags.format);
  }
};
