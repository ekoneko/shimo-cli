import { Result } from "meow";
import * as path from "path";
import { importFile } from "../import";
import { parseFolder } from "../utils/cliParser";

export const name = ["import"];
export const description = ["Import a file", "shimo-cli import $filePath", "--folder $guid"].join(
  "\n\t",
);
export const command = async (cli: Result) => {
  const filePath = cli.input[1];
  const folder = parseFolder(cli);
  const fileParser = path.parse(filePath);
  const fileName = fileParser.name;
  const type = getType(fileParser.ext);
  const file = await importFile(filePath, folder, fileName, type);
  process.stdout.write("Created " + process.env.APP_URL + file.url);
};

function getType(fileExt: string): string {
  if ([".doc", ".docx"].includes(fileExt)) {
    return "newdoc";
  } else if ([".xlsx"].includes(fileExt)) {
    return "sheet";
  } else {
    process.stderr.write("Not support this file extension");
    process.exit();
    return ""; // for ts check
  }
}
