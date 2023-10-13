import { useDispatch, useSelector } from "react-redux";
import { selectConversations, setConversations } from "@/store/conversations";
import { Conversation } from "@/models";
import { setCurrentConversation } from "@/store/currentConversation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NewAction } from "./new-action";

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

  if (!conversations[conversations.length - 1]) return null;

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
      className="flex items-center w-full h-[4.5rem] bg-[#111B21] pl-3 pr-4 hover:bg-[#2A3942] cursor-pointer
    "
      onClick={() => {
        dispatch(setCurrentConversation(conversation));
        navigate(`/${conversation?.to}`);
      }}
    >
      <div className="flex flex-col w-full px-2">
        <hr style={{ borderTop: ` solid rgba(134,150,160,0.15)` }} />
        <div className="flex py-2">
          <div className="flex flex-col w-full h-full ">
            <span className="overflow-y-hidden text-ellipsis text-white text-base">
              {conversation.name} - {conversation.to}
            </span>
            <span className="overflow-y-hidden text-ellipsis text-[#aebac1] text-sm">
              {conversation.message}
            </span>
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
      ? `0${date.getHours()}`
      : date.getMinutes();
  const time = `${hour}:${minutes}`;

  return <h1 className="text-xs">{time}</h1>;
};
