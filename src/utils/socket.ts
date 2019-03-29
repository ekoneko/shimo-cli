import * as io from "socket.io-client";
import * as qs from "querystring";
import { getUserToken } from "./userData";
import { v4 } from "uuid";

export class Socket {
  public readonly client: SocketIOClient.Socket;
  public ready: boolean;
  constructor() {
    const token = getUserToken();
    if (!token) {
      throw new Error("Not login yet");
    }
    const query = {
      pushClientId: v4(),
      accessToken: getUserToken(),
    };
    this.client = io(process.env.WS_URL! + "?" + qs.stringify(query), {
      transports: ["websocket"],
      path: "/ws",
    });

    this.client.on("connect", () => {
      this.ready = true;
    });

    this.client.on("disconnect", () => {
      this.ready = false;
    });
  }
}
