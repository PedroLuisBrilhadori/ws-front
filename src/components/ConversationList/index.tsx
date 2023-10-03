import { useSelector } from "react-redux";
import { selectConversations } from "@/store/conversations";
import { Conversation } from "@/models";

export default function ConversationList() {
  const conversations = useSelector(selectConversations);

  return conversations.map((conversation) => {
    console.log(conversation);
    return (
      <Item
        key={`item-${conversation?.to || conversation?.from}`}
        conversation={conversation}
      />
    );
  });
}

type ItemProps = {
  conversation: Conversation;
};

const Item = ({ conversation }: ItemProps) => {
  return (
    <div className="flex items-center w-full h-[4.5rem] bg-[#111B21] pl-3 pr-4 hover:bg-[#2A3942] cursor-pointer">
      <div className="flex w-[4.8rem]"></div>
      <div className="flex flex-col w-full">
        <hr style={{ borderTop: ` solid rgba(134,150,160,0.15)` }} />
        <div className="flex py-2">
          <div className="flex flex-col w-full h-full ">
            <span className="overflow-y-hidden text-ellipsis text-white text-base">
              {conversation?.from || conversation?.to}
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
