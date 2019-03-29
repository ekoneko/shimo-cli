/**
 * NOTE:
 *  Shimo 可以通过 socket 获取通知的信息, 但是返回的信息太少了
 *  难以直接用于渲染桌面通知的推送
 *  因此 socket 仅作为检测到通知抵达的监听手段, 通过获取最近几条未读消息定位到对应的信息详情
 */

import * as querystring from "querystring";
import { notify } from "node-notifier";
import { NOTIFICATION_TYPES } from "./consts/notification";
import { getFileUrl } from "./utils/url";
import { request } from "./utils/request";
import { User, File } from "./types";
const open = require("open");

export interface NotificationData {
  id: number;
  type: number;
  user_id: number;
  file_name: string;
  file_type: number;
  target_id: number;
  link?: string;
}

interface NotifyInfo {
  message: string;
  title?: string;
  icon?: string;
  url?: string;
}

interface NotificationDetail {
  createdAt: string;
  id: string;
  isRead: boolean;
  notification: {
    targetId: number;
    targetType: NOTIFICATION_TYPES;
    msg: string;
    user?: User;
    file?: File;
    fileType?: number;
    fileName?: string;
    selectionGuid?: string;
  }; // TODO
  status: string;
  userId: number;
}

function format(detail: NotificationDetail, data: NotificationData): NotifyInfo | undefined {
  // console.log(detail, data);
  switch (detail.notification.targetType) {
    // 评论
    case NOTIFICATION_TYPES.COMMENT: {
      return {
        message: `${detail.notification.user!.name} 评论了「${detail.notification.file!.name}」`,
        icon: `${detail.notification.user!.avatar}`,
        url:
          getFileUrl(detail.notification.fileType!.toString(), detail.notification.file!.guid) +
          (detail.notification.selectionGuid ? `#${detail.notification.selectionGuid}` : ""),
      };
    }
    // 提及
    case NOTIFICATION_TYPES.MENTION:
      return {
        message: `${detail.notification.user!.name} ${detail.notification.msg}`,
        icon: `${detail.notification.user!.avatar}`,
        url:
          getFileUrl(detail.notification.fileType!.toString(), detail.notification.file!.guid) +
          (detail.notification.selectionGuid ? `#${detail.notification.selectionGuid}` : ""),
      };
    // 添加协作者
    case NOTIFICATION_TYPES.TEAMWORK:
      return {
        message: `${detail.notification.user!.name} ${detail.notification.msg}`,
        icon: `${detail.notification.user!.avatar}`,
        url: `${data.link}`,
      };
    case NOTIFICATION_TYPES.TEAM:
      return {
        message: `${detail.notification.user!.name} ${detail.notification.msg}`,
        icon: `${detail.notification.user!.avatar}`,
        url: `${data.link}`,
      };
    case NOTIFICATION_TYPES.INVITATION:
      return {
        message: `${detail.notification.user!.name} ${detail.notification.msg}`,
        icon: `${detail.notification.user!.avatar}`,
        url: `${data.link}`,
      };
    case NOTIFICATION_TYPES.MEMBER:
      return {
        message: `${detail.notification.user!.name} ${detail.notification.msg}`,
        icon: `${detail.notification.user!.avatar}`,
        url: `${data.link}`,
      };
    case NOTIFICATION_TYPES.SYSTEM:
      return {
        title: "系统通知",
        message: `${detail.notification.msg}`,
        url: `${data.link}`,
      };
    case NOTIFICATION_TYPES.DESTROY:
    case NOTIFICATION_TYPES.LIKE:
    case NOTIFICATION_TYPES.DATEREMIND:
    // NOTE: seems never be trigged
    case NOTIFICATION_TYPES.DATECHANGE:
    default:
      return;
  }
}

async function getNotificationDetail(id: number) {
  const nearlyData = await requestNotifications(10);
  const currentNotification = nearlyData.find(
    (data) => data.notification && data.notification.targetId === id,
  );
  return currentNotification;
}

async function requestNotifications(limit: number) {
  // request
  const query = querystring.stringify({
    limit,
    status: "unread",
  });
  const result = await request({
    url: process.env.API_URL + "/notifications?" + query,
    method: "GET",
  });
  const data: NotificationDetail[] = await result.json();
  return data;
}

export function watch(socket: SocketIOClient.Socket) {
  socket.on("Notification", async ({ data }: any) => {
    const detail = await getNotificationDetail(data.target_id);
    if (detail) {
      const notifiedInfo = format(detail, data);
      notifiedInfo &&
        notify(
          {
            title: notifiedInfo.title,
            message: notifiedInfo.message,
            icon: notifiedInfo.icon,
            actions: ["open", "close"],
          },
          (err, res, meta) => {
            if (
              notifiedInfo.url &&
              res === "activate" &&
              meta &&
              meta.activationValue !== "close"
            ) {
              open(notifiedInfo.url);
            }
          },
        );
    }
  });
  process.stdout.write("Watching...");
}
