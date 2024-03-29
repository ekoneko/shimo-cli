import { Result } from "meow";
import { Socket } from "../utils/socket";
import * as notification from "../notification";

export const name = ["notification", "watch"];
export const description = "Watch notification";
export const flags = <const>{};
export const command = async (cli: Result<typeof flags>) => {
  const socket = new Socket();
  const client = socket.client;
  try {
    await notification.watch(client);
  } catch (err) {
    client.close();
    throw err;
  }
};
