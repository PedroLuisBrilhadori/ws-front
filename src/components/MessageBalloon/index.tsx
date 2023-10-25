import { Message } from "@/models";
import { AlertTriangle, Check, CheckCheck, Clock } from "lucide-react";

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
      ? `0${date.getMinutes()}`
      : date.getMinutes();
  const time = `${hour}:${minutes}`;

  return (
    <div className={`flex flex-col ${flexAlignItems} mb-3`}>
      <div
        className={`flex flex-col ${backgroundColor} p-2 text-white rounded-lg ${borderRounded} `}
      >
        <div className="max-w-[700px]">
          <div className="self-start w-full break-words">
            <MessageBody message={message} />
          </div>
        </div>

        <div className="self-end text-[hsla(0,0%,100%,0.6)] text-xs">
          <div className="flex items-center gap-1 justify-between">
            <span>{time}</span>

            <StatusMessage me={message.me} status={message.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const MessageBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  if (message.type == "text")
    return <TextBody message={message.message} truncate={truncate} />;

  if (message.type == "image")
    return (
      <div>
        <img src={`http://localhost:3000/${message.id}.jpeg`} />
        <TextBody message={message.message} truncate={truncate} />
      </div>
    );
};

export const TextBody = ({
  message,
  truncate,
}: {
  message: string;
  truncate?: boolean;
}) => {
  const components = message.split("\n");

  return (
    <div className="flex flex-col">
      {components.map((text) => {
        let className = truncate ? "truncate" : "";

        if (/(?<![{[?}\]])\*(?!\s)(.+?)\*/.test(text)) {
          className = "font-bold";
          text = text.replace(/(?<![{[?}\]])\*(?!\s)(.+?)\*/, "$1");
        }

        if (/(?<![{[?}\]])\_(?!\s)(.+?)\_/.test(text)) {
          className = "italic text-xs";
          text = text.replace(/(?<![{[?}\]])\_(?!\s)(.+?)\_/, "$1");
        }

        return (
          <span className={className} key={`${text}-${Math.random()}`}>
            {text}
          </span>
        );
      })}
    </div>
  );
};

export const StatusMessage = ({
  status,
  me,
}: {
  status: string;
  me?: boolean;
}) => {
  const props = { className: `w-[14px]` };

  if (!me) return null;

  if (status === "sent") return <Check {...props} />;

  if (status === "delivered") return <CheckCheck {...props} />;

  if (status === "recived") return null;

  if (status === "read")
    return <CheckCheck className={`${props.className} text-blue-600`} />;

  if (status === "fail") return <AlertTriangle {...props} />;

  return <Clock {...props} />;
};
