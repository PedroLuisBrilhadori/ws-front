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
      <img src={`http://localhost:3000/${message.id}.jpeg`} />
      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
