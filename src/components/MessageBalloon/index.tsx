import { Message } from "@/models";
import { StatusMessage } from "./status";
import { MessageBody } from "./body";

interface MessageBalloonProps {
  message: Message;
}

export default function MessageBalloon(props: MessageBalloonProps) {
  const { message } = props;

  const me = message.me;

  const flexAlignItems = me ? "items-end" : "items-start";
  const backgroundColor = me
    ? "bg-ring !text-ring-foreground"
    : "bg-secondary !text-secondary-foreground";
  const borderRounded = me ? "rounded-tr-none" : "rounded-tl-none";

  const date = new Date(Number(message.timestamp) * 1000);
  const hour =
    `${date.getHours()}`.length == 1 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    `${date.getMinutes()}`.length == 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();
  const time = `${hour}:${minutes}`;

  return (
    <div className={`flex flex-col ${flexAlignItems} mb-3`}>
      <div
        className={`flex flex-col ${backgroundColor} min-w-[100px] max-w-[80%] p-2 text-white rounded-md ${borderRounded}`}
      >
        <div className="max-w-[700px]">
          <div className="self-start w-full break-all">
            <MessageBody message={message} />
          </div>
        </div>

        {/* TODO: descobrir por que imagens e documentos recebidos no messageBaloon tem margem inferior menor */}

        <div className="self-end text-foreground/70 text-xs">
          <div className="flex items-center gap-1 justify-between">
            <span>{time}</span>

            <StatusMessage me={message.me} status={message.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
