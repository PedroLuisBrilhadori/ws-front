import { useDispatch, useSelector } from "react-redux";
import { selectConversations } from "@/store/conversations";
import { Conversation } from "@/models";
import { setCurrentConversation } from "@/store/currentConversation";
import { useNavigate } from "react-router-dom";

export default function ConversationList() {
  const conversations = useSelector(selectConversations);

  return conversations.map((conversation) => {
    return <Item key={`item-${conversation.to}`} conversation={conversation} />;
  });
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
          <div className="flex flex-col w-auto text-[#aebac1]">
            <DisplayHourItem timestamp={conversation.timestamp} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayHourItem = ({ timestamp }: { timestamp: string }) => {
  const date = new Date(Number(timestamp) * 1000);

  return (
    <h1 className="text-xs">{`${date.getHours()}:${date.getMinutes()}`}</h1>
  );
};
