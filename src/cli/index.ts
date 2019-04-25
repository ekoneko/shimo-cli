import * as login from "./login";
import * as logout from "./logout";
import * as me from "./me";
import * as notificationConf from "./notification-conf";
import * as notificationWatch from "./notification-watch";
import * as list from "./list";
import * as search from "./search";
import * as open from "./open";
import * as fileCreate from "./file-create";
import * as fileDelete from "./file-delete";
import * as fileContent from "./file-content";
import * as importFile from "./import";
import * as exportFile from "./export";

// Order for compose help text
export default [
  login,
  logout,
  open,
  me,
  notificationConf,
  notificationWatch,
  list,
  search,
  fileCreate,
  fileDelete,
  fileContent,
  importFile,
  exportFile,
];
