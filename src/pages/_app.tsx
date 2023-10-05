import "../index.css";
import { Outlet, useParams } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store";
import { useEffect, useState } from "react";
import { socket } from "@/services";
import { addMessage, updateMessage } from "@/store/messages";
import { Message } from "postcss";
import { addConversation } from "@/store/conversations";

function MyApp() {
  const dispatch = useDispatch();
  const { to } = useParams();

  useEffect(() => {
    const onMessageRecived = (value: Message) => {
      dispatch(addConversation(false));
      if (value.to == to) dispatch(addMessage(value));
    };

    const onMessageUpdate = (value: Message) => {
      if (value.to == to)
        dispatch(updateMessage({ id: value.id, update: value }));
    };

    const onConversationUpdate = (value: boolean) => {
      dispatch(addConversation(false));
    };

    socket.on("conversation.created", onConversationUpdate);
    socket.on("message.recived", onMessageRecived);
    socket.on("message.update", onMessageUpdate);

    return () => {
      socket.off("conversation.created", onConversationUpdate);
      socket.off("message.recived", onMessageRecived);
      socket.off("message.update", onMessageUpdate);
    };
  }, []);

  return <Outlet />;
}

export default MyApp;
