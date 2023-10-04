import ConversationDetails from "@/components/ConversationDetails";
import { Message } from "@/models";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "@/store/currentConversation";
import { addMessage, selectMessage, setMessages } from "@/store/messages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function Index() {
  const { to } = useParams();
  const current = useSelector(selectCurrentConversation);
  const messages = useSelector(selectMessage);
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(
    io("http://localhost:3000", {
      autoConnect: true,
    })
  );

  useEffect(() => {
    if (to) {
      fetch(`http://localhost:3000/messages/${to}`).then(async (response) => {
        const messages = await response.json();

        dispatch(setMessages(messages));

        if (!current) {
          dispatch(setCurrentConversation({ to }));
        }
      });

      setTimeout(() => {
        scroll();
      }, 100);
    }

    const onMessageRecived = (value: Message) => {
      if (value.to == to) dispatch(addMessage(value));
    };

    socket.on("message.recived", onMessageRecived);

    return () => {
      socket.off("message.recived", onMessageRecived);
    };
  }, [messages.length]);

  return (
    <div className="flex justify-center">
      <div className="flex w-full xl:container h-screen xl:py-4">
        {messages.length > 0 ? <ConversationDetails /> : null}
      </div>
    </div>
  );
}
