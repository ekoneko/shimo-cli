import { Result } from "meow";
import { pick } from "lodash";
import { search } from "../search";
import { parseLimit } from "../utils/cliParser";
import { format, FormatType } from "../utils/format";
import { more, clearLine } from "../utils/input";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;
const DEFAULT_FIELDS = ["guid", "name", "createdAt", "updatedAt", "user.name"];

export const name = ["search"];
export const description = [
  "search file",
  "shimo-cli search $keyword",
  `--format\tdisplay format(${Object.values(FormatType).join("|")})`,
  "--fields\tfields filter, split by comma",
  "--limit \tset return line count",
].join("\n\t");
export const flags = <const>{
  format: {
    type: "string",
    default: "text",
  },
  fields: {
    type: "string",
  },
  limit: {
    type: "string",
  },
};
export const command = async (cli: Result<typeof flags>) => {
  const keywords = cli.input[1];
  const limit = parseLimit(cli, DEFAULT_LIMIT, MAX_LIMIT);
  if (!keywords) {
    process.stdout.write("Need some keywords");
    process.exit();
  }
  await searchOnce(cli, keywords, limit);
};

async function searchOnce(
  cli: Result<typeof flags>,
  keywords: string,
  limit: number,
  params?: string,
) {
  process.stdout.write("Searching...\n");
  const { nextParams, files } = await search(keywords, limit, params);
  clearLine();
  const fields = cli.flags.fields ? cli.flags.fields.split(",") : DEFAULT_FIELDS;
  const result = files.map((file) => pick(file, fields));
  format(result, cli.flags.format as FormatType);

  if (nextParams) {
    const needMore = await more();
    if (needMore) {
      await searchOnce(cli, keywords, limit, nextParams);
    }
  }
}
