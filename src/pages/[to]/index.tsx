import ConversationDetails from "@/components/ConversationDetails";
import { Message, Status } from "@/models";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "@/store/currentConversation";
import {
  addMessage,
  selectMessage,
  setMessages,
  updateMessage,
} from "@/store/messages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: true,
});

export default function Index() {
  const { to } = useParams();
  const current = useSelector(selectCurrentConversation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (to) {
      fetch(`http://localhost:3000/messages/${to}`).then(async (response) => {
        const messages = await response.json();

        dispatch(setMessages(messages));

        if (!current) {
          fetch(`http://localhost:3000/messages/conversations/${to}`).then(
            async (response) => {
              const conversations = await response.json();

              dispatch(setCurrentConversation(conversations));
            }
          );
        }
      });

      setTimeout(() => {
        scroll();
      }, 100);
    }

    const onMessageRecived = (value: Message) => {
      if (value.to == to) dispatch(addMessage(value));
    };

    const onMessageUpdate = (value: Message) => {
      if (value.to == to)
        dispatch(updateMessage({ id: value.id, update: value }));
    };

    socket.on("message.recived", onMessageRecived);
    socket.on("message.update", onMessageUpdate);

    return () => {
      socket.off("message.recived", onMessageRecived);
      socket.off("message.update", onMessageUpdate);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex w-full xl:container h-screen xl:py-4">
        <ConversationDetails />
      </div>
    </div>
  );
}
