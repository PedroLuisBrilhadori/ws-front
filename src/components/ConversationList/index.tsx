import { useDispatch, useSelector } from "react-redux";
import { selectConversations, setConversations } from "@/store/conversations";
import { Conversation, MetaAccount } from "@/models";
import { setCurrentConversation } from "@/store/currentConversation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NewAction } from "./new-action";
import { MessageItem } from "./item";
import { removeTelephoneMask, telephoneMask } from "@/lib/telephone";
import { findConversations } from "@/services/conversations/find-conversations";
import { useUserHeaders } from "@/hooks";
import { selectCurrentMetaAccount } from "@/store/current-meta-account";
import { ScrollArea } from "@/components/ui/scroll-area";

export type ConversationListProps = {
  search: string;
};

export default function ConversationList({ search }: ConversationListProps) {
  const conversations = useSelector(selectConversations);
  const metaAccount = useSelector(selectCurrentMetaAccount);
  const { user, headers } = useUserHeaders();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id && metaAccount.id)
      findConversations({ metaAccount, headers }).then((conversations) => {
        dispatch(setConversations(conversations));
      });
  }, [user, metaAccount]);

  if (!conversations?.map) return null;

  return (
    <ScrollArea id="conversation" className="h-[calc(100vh-53px)]">
      <div className="flex flex-col gap-y-2 place-content-evenly px-4 pt-4 pb-24 w-screen">
        {conversations.map((conversation) => {
          if (search.length === 0)
            return (
              <Item
                metaAccount={metaAccount}
                key={`item-${conversation.to}`}
                conversation={conversation}
              />
            );

          if (
            conversation.name.toLowerCase().includes(search.toLowerCase()) ||
            conversation.to.includes(removeTelephoneMask(search)) ||
            telephoneMask(conversation.to).includes(search)
          ) {
            return (
              <Item
                key={`item-${conversation.to}`}
                metaAccount={metaAccount}
                conversation={conversation}
              />
            );
          }

          return null;
        })}
      </div>

      <NewAction />
    </ScrollArea>
  );
}

type ItemProps = {
  conversation: Conversation;
  metaAccount: MetaAccount;
};

const Item = ({ conversation, metaAccount }: ItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="bg-card hover:bg-secondary cursor-pointer flex flex-row h-[90px] px-4 py-2 rounded-md w-full"
      onClick={() => {
        dispatch(setCurrentConversation(conversation));
        navigate(`/conversa/${metaAccount.id}/${conversation?.to}`);
      }}
    >
      <div className="flex flex-col gap-y-4 h-full w-[85%] md:w-[95%]">
        <div className="flex flex-wrap gap-x-2 items-center">
          <div className="text-base text-foreground">{conversation.name}</div>
          <div className="text-foreground text-xs">
            {telephoneMask(conversation.to)}
          </div>
        </div>

        <MessageItem className="" conversation={conversation} />
      </div>

      <div className="flex flex-col gap-y-4 h-full place-items-center w-[15%] md:w-[5%]">
        <div className="h-[24px] w-[30px] pt-[4px]">
          <DisplayHourItem timestamp={conversation.timestamp} />
        </div>

        <div className="h-[24px] pt-[4px]">
          {conversation.unread !== "0" && (
            <span className="rounded-full w-[20px] h-[20px] bg-primary font-medium text-primary-foreground text-xs flex items-center justify-center">
              {conversation.unread}
            </span>
          )}
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

  return <h1 className="text-xs text-foreground">{time}</h1>;
};
