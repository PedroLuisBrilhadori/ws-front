import { useEffect, useRef, useState } from "react";
import MessageBalloon from "../MessageBalloon";
import { ConversationFooter } from "./footer";
import { ConversationHeader } from "./header";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation } from "@/models";
import { selectMessage, setMessages } from "@/store/messages";
import { ScrollIcon } from "lucide-react";

export default function ConversationDetails() {
  const current = useSelector(selectCurrentConversation);
  const messages = useSelector(selectMessage);
  const messageRef = useRef<HTMLDivElement>(null);

  const scroll = () => {
    messageRef.current &&
      messageRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
  };

  setTimeout(() => {
    scroll();
  }, 100);

  return (
    <div className="flex flex-col w-full">
      <ConversationHeader
        image={"image"}
        contactName={
          (current && (current as unknown as Conversation)?.to) || ""
        }
      />

      <div
        className="flex flex-col w-full h-full px-5 py-6 overflow-y-auto"
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
