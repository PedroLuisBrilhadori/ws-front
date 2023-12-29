import { useSelector } from "react-redux";
import { Message } from "@/models";
import { selectMessage } from "@/store/messages";
import { useRef } from "react";
import MessageBalloon from "../MessageBalloon";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ConversationMessages = () => {
  let days = useSelector(selectMessage);

  return (
    <ScrollArea className="h-full">
      <div
        className="flex flex-col w-full h-full px-5 pt-14"
        // style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
      >
        {days.map(({ day, messages }, index) => {
          const date = new Date(day);

          const dateLabel = () => {
            if (date) {
              const day = `${date.getDate()}`;
              const month = `${date.getMonth() + 1}`;

              return `${`${day}`.length == 1 ? `0${day}` : day}/${
                `${month}`.length == 1 ? `0${month}` : month
              }/${date.getFullYear()}`;
            }

            return day;
          };

          const formattedDate = dateLabel();

          return (
            <div className="flex flex-col" key={`${day}-${index}`}>
              <span className="bg-gray-600 text-white px-4 py-1 my-4 self-center text-center rounded-full opacity-75">
                {formattedDate}
              </span>
              <Messages messages={messages} />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

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

  if (!messages?.map) return null;

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
