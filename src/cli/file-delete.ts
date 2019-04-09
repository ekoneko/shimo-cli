import { Result } from "meow";
import { deleteFile } from "../file";

export const name = ["file", "delete"];
export const description = ["Delete selected file", "shimo-cli file delete $guid"].join("\n\t");

async function removeMultipleFile(guids: string[]) {
  const tasks: string[][] = [];
  for (let i = 0; i < guids.length; i += 5) {
    tasks.push(guids.slice(i, i + 5));
  }
  const handlers = tasks.map((task) => Promise.all(task.map((guid) => deleteFile(guid))));
  await Promise.all(handlers);
}

export const command = async (cli: Result) => {
  if (!cli.input[2]) {
    process.stdout.write("No file to delete");
    process.exit();
  }
  const guids = cli.input[2].split(",");
  await removeMultipleFile(guids);
};
