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

  const contactName =
    current.name != "Desconhecido"
      ? `${current.name}`
      : `${telephoneMask(current.to)}`;

  return (
    <div className="bg-background fixed gap-y-2 h-[53px] px-4 shadow-background shadow-lg top-0 w-full z-20">
      <h2 className="flex flex-row gap-x-2 h-[53px] items-center place-content-between w-full">
        <div className="flex flex-row gap-x-4 items-center text-foreground">
          <ArrowLeft
            className="hover:cursor-pointer"
            onClick={() => navigate("/")}
          />
          <a
            href={`/conversa/${current.to}/perfil`}
            className="font-semibold text-lg"
          >
            {contactName}
          </a>
        </div>
      </h2>
    </div>
  );
};
