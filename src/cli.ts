import * as meow from "meow";
import { config } from "./config";
import cliTasks from "./cli/index";
import { get, set } from "lodash";

const flags = {};

interface CommandMap {
  [key: string]: (cli: meow.Result<typeof flags>) => void | CommandMap;
}

const commandMap: CommandMap = {};

function formatNameInDescription(name: string | string[]) {
  if (typeof name === "string") return name;
  return name.filter((name) => name !== "default").join(" ");
}

const description: string[] = [];
cliTasks.forEach((task) => {
  description.push(`${formatNameInDescription(task.name)}\n\t${task.description}`);
  if (process.env.NODE_ENV === "development" && get(commandMap, task.name)) {
    throw new Error(`Don't over write cli name(${task.name}).`);
  }
  set(commandMap, task.name, task.command);
  Object.assign(flags, task.flags);
});

const cli = meow(description.join("\n\n"), {
  flags: {
    format: {
      type: "string",
      default: "text",
    },
    force: {
      type: "boolean",
      alias: "f",
    },
  },
});

function lookup(commandMap: CommandMap, cli: meow.Result<typeof flags>, inputIndex: number = 0) {
  const input = cli.input[inputIndex] || "default";
  if (!commandMap[input]) {
    if (cli.input.length > 1) {
      process.stdout.write("Unknown command\n");
    }
    // default code is 2, it will case npm throw an exception
    cli.showHelp(0);
  } else if (typeof commandMap[input] === "function") {
    try {
      commandMap[input](cli);
    } catch (err) {
      console.error(err);
    }
  } else {
    lookup(commandMap[input] as any as CommandMap, cli, inputIndex + 1);
  }
}

(async () => {
  await config();
  lookup(commandMap, cli);
})();
