import { useDispatch, useSelector } from "react-redux";
import { selectConversations, setConversations } from "@/store/conversations";
import { Conversation } from "@/models";
import { setCurrentConversation } from "@/store/currentConversation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NewAction } from "./new-action";
import { MessageItem } from "./item";
import { removeTelephoneMask, telephoneMask } from "@/lib/telephone";
import { findConversations } from "@/services/conversations/find-conversations";
import { useUserHeaders } from "@/hooks";

export type ConversationListProps = {
  search: string;
};

export default function ConversationList({ search }: ConversationListProps) {
  const conversations = useSelector(selectConversations);
  const { user, headers } = useUserHeaders();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id)
      findConversations({ user, headers }).then((conversations) => {
        dispatch(setConversations(conversations));
      });
  }, [user]);

  if (!conversations?.map) return null;

  return (
    <div>
      {conversations.map((conversation) => {
        if (search.length === 0)
          return (
            <Item key={`item-${conversation.to}`} conversation={conversation} />
          );

        if (
          conversation.name.toLowerCase().includes(search.toLowerCase()) ||
          conversation.to.includes(removeTelephoneMask(search)) ||
          telephoneMask(conversation.to).includes(search)
        ) {
          return (
            <Item key={`item-${conversation.to}`} conversation={conversation} />
          );
        }

        return null;
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
              {conversation.name} - {telephoneMask(conversation.to)}
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
