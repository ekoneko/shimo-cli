import { toPairs } from "lodash";

export enum FormatType {
  TEXT = "text",
  JSON = "json",
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

export function format(data: any, type: FormatType) {
  switch (type) {
    case FormatType.JSON:
      return JSON.stringify(data);
    case FormatType.TEXT:
    default:
      return formatText(data);
  }
}
