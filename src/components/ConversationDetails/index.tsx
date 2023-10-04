import { useRef } from "react";
import { ConversationFooter } from "./footer";
import { ConversationHeader } from "./header";
import { useSelector } from "react-redux";
import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation, Message } from "@/models";
import { selectMessage } from "@/store/messages";
import MessageBalloon from "../MessageBalloon";

const Messages = ({ messages }: { messages: Message[] }) => {
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

  return messages.map((message, index) => {
    if (index == messages.length - 1) {
      messageRef.current && messageRef.current.scrollIntoView();

      return (
        <div ref={messageRef} key={`message-${message.id}`}>
          <MessageBalloon message={message} />
        </div>
      );
    }
    return <MessageBalloon key={`message-${message.id}`} message={message} />;
  });
};

export default function ConversationDetails() {
  const current = useSelector(selectCurrentConversation);
  const days = useSelector(selectMessage);

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
        {days.map(({ day, messages }, index) => {
          const date = new Date(day);

          const dateLabel = () => {
            if (date) {
              const day = `${date.getDate()}`;
              const month = `${date.getMonth() + 1}`;

              return `${day.length == 1 ? "0" + day : day}/${
                month.length == 1 ? "0" + month : month
              }/${date.getFullYear()}`;
            }

            return day;
          };

          const formattedDate = dateLabel();

          return (
            <div className="flex flex-col" key={`${day}-${index}`}>
              <span className="bg-gray-600 text-white px-4 py-1 self-center text-center rounded-full opacity-75">
                {formattedDate}
              </span>
              <Messages messages={messages} />;
            </div>
          );
        })}
      </div>

      <ConversationFooter />
    </div>
  );
}
