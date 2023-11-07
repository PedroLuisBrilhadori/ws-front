import { useDispatch, useSelector } from "react-redux";
import { selectConversations, setConversations } from "@/store/conversations";
import { Conversation } from "@/models";
import { setCurrentConversation } from "@/store/currentConversation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NewAction } from "./new-action";
import { TextBody } from "../MessageBalloon/text-body";

export default function ConversationList() {
  const conversations = useSelector(selectConversations);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000/messages/conversations`).then(
      async (response) => {
        const conversations = await response.json();
        dispatch(setConversations(conversations));
      }
    );
  }, []);

  return (
    <div>
      {conversations.map((conversation) => {
        return (
          <Item key={`item-${conversation.to}`} conversation={conversation} />
        );
      })}

      <NewAction />
    </div>
  );
}

type ItemProps = {
  conversation: Conversation;
};

const Item = ({ conversation }: ItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer bg-[#111B21] hover:bg-[#2A3942] h-[70px] overflow-hidden"
      onClick={() => {
        dispatch(setCurrentConversation(conversation));
        navigate(`/conversation/${conversation?.to}`);
      }}
    >
      <hr />

      <div className="flex flex-col w-full px-1 justify-between">
        <div className="flex mt-1">
          <div className="flex flex-col overflow-hidden w-full justify-between">
            <span className="text-ellipsis text-white text-base">
              {conversation.name} - {conversation.to}
            </span>

            <MessageItem className="" conversation={conversation} />
          </div>

          <div className="flex flex-col items-end justify-between text-[#aebac1]">
            <DisplayHourItem timestamp={conversation.timestamp} />

            {conversation.unread !== "0" && (
              <span className="rounded-full w-[20px] h-[20px] bg-green-600 font-medium text-black text-xs flex items-center justify-center">
                {conversation.unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type MessageItemProps = {
  conversation: Conversation;
  className?: string;
};

const MessageItem = ({ conversation, className }: MessageItemProps) => {
  return (
    <span className={`text-[#aebac1] text-sm truncate ${className}`}>
      <TextBody truncate text={conversation.message} />
    </span>
  );
};

const DisplayHourItem = ({ timestamp }: { timestamp: string }) => {
  const date = new Date(Number(timestamp) * 1000);
  const hour =
    `${date.getHours()}`.length == 1 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    `${date.getMinutes()}`.length == 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();
  const time = `${hour}:${minutes}`;

  return <h1 className="text-xs">{time}</h1>;
};
