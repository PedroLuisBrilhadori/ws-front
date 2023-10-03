import { Message } from "@/models";

interface MessageBalloonProps {
  message: Message;
}

export default function MessageBalloon(props: MessageBalloonProps) {
  const { message } = props;

  const me = message.from ? false : true;

  const flexAlignItems = me ? "items-end" : "items-start";
  const backgroundColor = me ? "bg-[#005c4b]" : "bg-[#202c33]";
  const borderRounded = me ? "rounded-tr-none" : "rounded-tl-none";

  const date = new Date(Number(message.timestamp) * 1000);
  const time = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className={`flex flex-col ${flexAlignItems} w-full h-max`}>
      <div
        className={`flex flex-col min-w-[5%] max-w-[65%] h-max ${backgroundColor} p-2 text-white rounded-lg ${borderRounded} mb-3`}
      >
        <div className="flex flex-col w-full break-words">
          <span>{message.message}</span>
        </div>
        <div className="flex justify-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
