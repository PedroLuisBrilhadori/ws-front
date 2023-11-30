import { selectCurrentConversation } from "@/store/currentConversation";
import { Conversation } from "@/models";
import { Mic, Send } from "lucide-react";
import { KeyboardEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/messages";
import { Clip } from "./Clip/clip";
import { sendMessageService } from "@/services";
import { Recorder } from "./recorder";
import { useUserHeaders } from "@/hooks";

export const ConversationFooter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [recording, setRecording] = useState(false);
  const dispatch = useDispatch();
  const justify = recording ? "justify-end" : "justify-between";
  const { headers, user } = useUserHeaders();

  const current = useSelector(selectCurrentConversation);

  const changeHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    const { key } = evt;

    if (key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!current || !inputRef || !inputRef?.current || !user.company) return;

    const { to } = current as unknown as Conversation;
    const text = inputRef.current?.value || "";

    sendMessageService({ to, text, headers, company: user.company }).then(
      (message) => {
        dispatch(addMessage(message));
      }
    );

    inputRef.current.value = "";
  };

  const FooterHandler = () => {
    if (recording) return <Recorder recordHandler={setRecording} />;

    return (
      <>
        <div className="flex w-full h-12">
          <input
            ref={inputRef}
            type={"text"}
            className="bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white"
            placeholder="Mensagem..."
            onKeyDown={(evt) => changeHandler(evt)}
          />
        </div>

        <Clip />

        <Sender text={false} onRecord={setRecording} onClick={sendMessage} />
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
  text: boolean;
  onClick: (e: any) => void;
  onRecord: (record: boolean) => void;
};
export const Sender = ({ text, onClick, onRecord }: SenderProps) => {
  if (text)
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
