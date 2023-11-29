import "../index.css";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { socket } from "@/services";
import { addMessage, updateMessage } from "@/store/messages";
import { Message } from "postcss";
import { addConversation } from "@/store/conversations";
import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation } from "@/models";
import { AuthProvider } from "@/context/auth";

function MyApp() {
  const dispatch = useDispatch();
  const current = useSelector(selectCurrentConversation);
  const to = current ? (current as unknown as Conversation).to : "";

  useEffect(() => {
    const onMessageRecived = (value: Message) => {
      dispatch(addConversation(false));
      dispatch(addMessage(value));
    };

    const onMessageUpdate = (value: Message) => {
      dispatch(updateMessage({ id: value.id, update: value }));
    };

    const onConversationUpdate = (value: boolean) => {
      dispatch(addConversation(value));
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

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default MyApp;
