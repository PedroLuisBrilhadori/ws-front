import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation } from "@/models";
import { Mic, Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/messages";
import { Clip } from "./Clip/clip";
import { sendMessageService } from "@/services";
import { Recorder } from "./recorder";

export const ConversationFooter = () => {
  const [text, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const dispatch = useDispatch();
  const justify = recording ? "justify-end" : "justify-between";

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

  const FooterHandler = () => {
    if (recording) return <Recorder recordHandler={setRecording} />;

    return (
      <>
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

        <Sender onRecord={setRecording} text={text} onClick={sendMessage} />
      </>
    );
  };

  return (
    <footer
      className={`flex w-full items-center ${justify} bg-[#202c33] text-[#8696a0] p-4 gap-3 h-16`}
    >
      <FooterHandler />
    </footer>
  );
};

export type SenderProps = {
  text: string;
  onClick: (e: any) => void;
  onRecord: (record: boolean) => void;
};
export const Sender = ({ text, onClick, onRecord }: SenderProps) => {
  if (text.length === 0)
    return (
      <Mic
        className="cursor-pointer"
        onClick={() => {
          onRecord(true);
        }}
      />
    );

  return <Send className="cursor-pointer" onClick={onClick} />;
};
