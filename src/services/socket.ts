import { io } from "socket.io-client";
import { baseUrl } from ".";

export const socket = io(`${baseUrl}`, {
  autoConnect: true,
});
