import { Message } from "@/models";
import { Check, CheckCheck, Clock } from "lucide-react";

interface MessageBalloonProps {
  message: Message;
}

export default function MessageBalloon(props: MessageBalloonProps) {
  const { message } = props;

  const me = message.me;

  const flexAlignItems = me ? "items-end" : "items-start";
  const backgroundColor = me ? "bg-[#005c4b]" : "bg-[#202c33]";
  const borderRounded = me ? "rounded-tr-none" : "rounded-tl-none";

  const date = new Date(Number(message.timestamp) * 1000);
  const hour =
    `${date.getHours()}`.length == 1 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    `${date.getMinutes()}`.length == 1
      ? `0${date.getHours()}`
      : date.getMinutes();
  const time = `${hour}:${minutes}`;

  return (
    <div className={`flex flex-col ${flexAlignItems} mb-3`}>
      <div
        className={`flex gap-2 ${backgroundColor} p-2 text-white rounded-lg ${borderRounded} `}
      >
        <div className="self-start w-full break-words">
          <span>{message.message}</span>
        </div>

        <div className="self-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
          <div className="flex items-center gap-1 justify-between">
            <span>{time}</span>

            <StatusMessage status={message.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const StatusMessage = ({ status }: { status: string }) => {
  const props = { className: `w-[14px]` };

  if (status === "sent") return <Check {...props} />;

  if (status === "delivered") return <CheckCheck {...props} />;

  if (status === "recived") return null;

  return <Clock {...props} />;
};
