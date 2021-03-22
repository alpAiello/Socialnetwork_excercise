import { chatMessages, chatMessage } from "./action.js";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on("messages", (msgs) => store.dispatch(chatMessages(msgs)));

    socket.on("new message", (msg) => store.dispatch(chatMessage(msg)));
};
