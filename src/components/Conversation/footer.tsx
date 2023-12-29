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
import { Input } from "@/components/ui/input";
import { selectCurrentMetaAccount } from "@/store/current-meta-account";

export const ConversationFooter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [recording, setRecording] = useState(false);
  const dispatch = useDispatch();
  const justify = recording ? "justify-end" : "justify-between";
  const { headers, user } = useUserHeaders();
  const metaBusinessAccount = useSelector(selectCurrentMetaAccount);

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

    sendMessageService({
      to,
      text,
      headers,
      company: user.company,
      metaBusinessAccount,
    }).then((message) => {
      dispatch(addMessage(message));
    });

    inputRef.current.value = "";
  };

  const FooterHandler = () => {
    if (recording) return <Recorder recordHandler={setRecording} />;

    return (
      <div className="flex flex-row gap-x-2 relative items-center px-4 pt-2 h-full w-full">
        <Input
          ref={inputRef}
          type={"text"}
          placeholder="Mensagem"
          onKeyDown={(evt) => changeHandler(evt)}
          className="rounded-full w-[97%] h-9/10"
        />

        <Clip />

        <Sender text={false} onRecord={setRecording} onClick={sendMessage} />
      </div>
    );
  };

  return (
    <footer className={`flex w-full items-center mb-2 ${justify} h-[64px]`}>
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

  return (
    <Send className="cursor-pointer text-foreground w-fit" onClick={onClick} />
  );
};
