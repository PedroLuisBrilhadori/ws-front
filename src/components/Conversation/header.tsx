import { telephoneMask } from "@/lib/telephone";
import { Conversation } from "@/models";
import { selectCurrentConversation } from "@/store/currentConversation";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ConversationHeader = () => {
  const navigate = useNavigate();

  const current = useSelector(
    selectCurrentConversation
  ) as unknown as Conversation;

  const contactName = current
    ? `${current.name} - ${telephoneMask(current.to)}`
    : null;

  return (
    <div className="flex justify-between w-full">
      <div className="flex justify-between items-center bg-[#202c33] w-full h-14 px-4">
        <ArrowLeft
          className="cursor-pointer text-white"
          onClick={() => {
            navigate(`/`);
          }}
        />

        <div className="flex items-center gap-4 h-full">
          <h1 className="text-white font-normal">{contactName}</h1>
        </div>
      </div>
    </div>
  );
};
