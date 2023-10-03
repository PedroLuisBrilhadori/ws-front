import { useEffect, useRef, useState } from "react";
import MessageBalloon from "../MessageBalloon";
import { ConversationFooter } from "./footer";
import { ConversationHeader } from "./header";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation } from "@/models";
import { selectMessage, setMessages } from "@/store/messages";

export default function ConversationDetails() {
  const current = useSelector(selectCurrentConversation);
  const messages = useSelector(selectMessage);
  const dispatch = useDispatch();
  const messageRef = useRef<HTMLDivElement>(null);

  const scroll = () => {
    messageRef.current &&
      messageRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
  };

  useEffect(() => {
    if (current) {
      const { to } = current as unknown as Conversation;

      fetch(`http://localhost:3000/messages/${to}`).then(async (response) => {
        const messages = await response.json();

        dispatch(setMessages(messages));
      });

      setTimeout(() => {
        scroll();
      }, 100);
    }
  }, [current, messageRef.current]);

  return (
    <div className="flex flex-col w-full">
      <ConversationHeader
        image={"image"}
        contactName={
          (current && (current as unknown as Conversation)?.to) || ""
        }
      />

      <div
        className="flex flex-col w-full h-full px-24 py-6 overflow-y-auto"
        style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
      >
        {messages.map((message, index) => {
          if (index == messages.length - 1) {
            messageRef.current && messageRef.current.scrollIntoView();

            return (
              <div ref={messageRef} key={`message-${message.id}`}>
                <MessageBalloon message={message} />
              </div>
            );
          }
          return (
            <MessageBalloon key={`message-${message.id}`} message={message} />
          );
        })}
      </div>

      <ConversationFooter />
    </div>
  );
}
