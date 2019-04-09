import { Result } from "meow";
import { pick } from "lodash";
import { search } from "../search";
import { parseLimit } from "../utils/cliParser";
import { format } from "../utils/format";
import { more, clearLine } from "../utils/input";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;
const DEFAULT_FIELDS = ["guid", "name", "createdAt", "updatedAt", "user.name"];

export const name = ["search"];
export const description = [
  "search file",
  "shimo-cli search $keyword",
  "--format\tdisplay format",
  "--fields\tfields filter, split by comma",
  "--limit \tset return line count",
].join("\n\t");
export const command = async (cli: Result) => {
  const keywords = cli.input[1];
  const limit = parseLimit(cli, DEFAULT_LIMIT, MAX_LIMIT);
  if (!keywords) {
    process.stdout.write("Need some keywords");
    process.exit();
  }
  await searchOnce(cli, keywords, limit);
};

async function searchOnce(cli: Result, keywords: string, limit: number, params?: string) {
  process.stdout.write("Searching...\n");
  const { nextParams, files } = await search(keywords, limit, params);
  clearLine();
  const fields: string[] = cli.flags.fields
    ? (cli.flags.fields as string).split(",")
    : DEFAULT_FIELDS;
  const result = files.map((file) => pick(file, fields));
  process.stdout.write(format(result, cli.flags.format) + "\n");

  if (nextParams) {
    const needMore = await more();
    if (needMore) {
      await searchOnce(cli, keywords, limit, nextParams);
    }
  }
}
