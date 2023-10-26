import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation } from "@/models";
import { Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/messages";
import { Clip } from "./Clip/clip";
import { sendMessageService } from "@/services";

export const ConversationFooter = () => {
  const [text, setMessage] = useState("");
  const dispatch = useDispatch();

  const current = useSelector(selectCurrentConversation);

  const changeHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    const { key } = evt;

    if (key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!current) return;

    const { to } = current as unknown as Conversation;

    sendMessageService({ to, text }).then((message) => {
      dispatch(addMessage(message));
    });

    setMessage("");
  };

  return (
    <footer className="flex w-full items-center justify-between bg-[#202c33] text-[#8696a0] p-4 gap-3 h-16">
      <div className="flex w-full h-12">
        <input
          type={"text"}
          className="bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white"
          placeholder="Mensagem..."
          onKeyDown={(evt) => changeHandler(evt)}
          onChange={(evt) => setMessage(evt.target.value)}
          value={text}
        />
      </div>

      <Clip />

      <Send className="cursor-pointer" onClick={sendMessage} />
    </footer>
  );
};
