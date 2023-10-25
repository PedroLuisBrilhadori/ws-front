import { Message } from "@/models";
import { TextBody } from "./text-body";

export const MessageBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  if (message.type == "image")
    return <ImageBody message={message} truncate={truncate} />;

  return <TextBody text={message.message} truncate={truncate} />;
};

const ImageBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  return (
    <div>
      <a target="_blank" href={`http://localhost:3000/${message.id}.jpeg`}>
        <img
          className="w-[300px] h-[300px] object-cover rounded-sm"
          src={`http://localhost:3000/${message.id}.jpeg`}
        />
      </a>

      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
