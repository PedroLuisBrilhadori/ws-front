import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation } from "@/models";
import { Paperclip, Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateMessage } from "@/store/messages";
import { Clip } from "./clip";

export const ConversationFooter = () => {
  const [message, setMessage] = useState("");
  const dispach = useDispatch();

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

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    fetch(`http://localhost:3000/messages/text`, {
      method: `POST`,
      headers,
      body: JSON.stringify({
        to,
        message,
      }),
    }).then(async (response) => {
      const dto = {
        id: "temp",
        timestamp: `${new Date().getTime() / 1000}`,
        message,
        to,
        me: true,
        status: "",
      };

      dispach(addMessage(dto));

      const update = await response.json();

      if (response.status === 201) {
        dispach(updateMessage({ id: "temp", update }));
      } else {
        dispach(
          updateMessage({ id: "temp", update: { ...dto, status: "fail" } })
        );
        throw new Error("Impossível enviar a menssagem.");
      }
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
          value={message}
        />
      </div>

      <Clip />

      <Send className="cursor-pointer" onClick={sendMessage} />
    </footer>
  );
};
