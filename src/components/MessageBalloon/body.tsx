import { Message } from "@/models";
import { TextBody } from "./text-body";
import { ImageBody } from "./messages/image";
import { AudioBody } from "./messages/audio";

export const MessageBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  if (message.type == "image")
    return <ImageBody message={message} truncate={truncate} />;

  if (message.type == "audio") return <AudioBody message={message} />;

  return <TextBody text={message.message} truncate={truncate} />;
};
