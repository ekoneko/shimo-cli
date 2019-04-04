import { toPairs, toArray, values } from "lodash";

export enum FormatType {
  TEXT = "text",
  JSON = "json",
  TABLE = "oneline",
}

const TextPaddingSpaceCount = 2;

export const allowedTypes = [FormatType.TEXT, FormatType.JSON];

function formatText(data: any, level = 0) {
  let result = "";
  const paddingLeft = " ".repeat(level * TextPaddingSpaceCount);
  if (!data) {
    result += `${paddingLeft}\n`;
  } else if (typeof data !== "object") {
    result += paddingLeft + data;
  } else if (data instanceof Array) {
    result += data
      .reduce((pre, cur, index) => {
        pre[index] = `${paddingLeft}${formatText(cur, level)}`;
        return pre;
      }, [])
      .join("\n");
  } else {
    for (const [k, v] of toPairs(data)) {
      if (!v || typeof v !== "object") {
        result += `${paddingLeft}${k}: ${v}`;
      } else {
        result += `${paddingLeft}${k}:\n${formatText(v, level + 1)}`;
      }
      result += "\n";
    }
  }
  return result;
}

function formatTable(data: any) {
  const arrayData = toArray(data);
  if (!arrayData[0]) {
    return "";
  } else if (["string", "number"].includes(typeof arrayData[0])) {
    return arrayData.join("\n");
  } else if (typeof arrayData[0] === "object") {
    const keys = Object.keys(arrayData[0]);
    const result = arrayData.map((item) => {
      return keys
        .reduce<string[]>((pre, cur) => {
          pre.push(
            ["string", "number"].includes(typeof item[cur])
              ? item[cur]
              : values(item[cur]).join(" "),
          );
          return pre;
        }, [])
        .join("\t");
    });
    return result.join("\n");
  } else {
    return "";
  }
}

export function format(data: any, type: FormatType) {
  switch (type) {
    case FormatType.JSON:
      return JSON.stringify(data);
    case FormatType.TABLE:
      return formatTable(data);
    case FormatType.TEXT:
    default:
      return formatText(data);
  }
}
