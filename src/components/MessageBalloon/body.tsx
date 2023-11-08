import { Message } from "@/models";
import { TextBody } from "./text-body";
import { ImageBody } from "./messages/image";
import { AudioBody } from "./messages/audio";
import { DocumentBody } from "./messages/document";

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

  if (message.type == "document") return <DocumentBody message={message} />;

  return <TextBody text={message.message} truncate={truncate} />;
};
