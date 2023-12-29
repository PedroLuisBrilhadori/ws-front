import { Conversation } from "@/models";
import { TextBody } from "../MessageBalloon/text-body";
import { Camera, File, Mic } from "lucide-react";

type MessageItemProps = {
  conversation: Conversation;
  className?: string;
};

export const MessageItem = ({ conversation, className }: MessageItemProps) => {
  if (conversation?.type == "image") return <ImageItem />;

  if (conversation?.type == "document") return <DocumentItem />;

  if (conversation?.type == "audio") return <AudioItem />;

  return (
    <span className={`text-muted-foreground text-sm truncate ${className}`}>
      <TextBody truncate text={conversation.message} />
    </span>
  );
};

const ImageItem = () => {
  return (
    <span className="text-muted-foreground text-sm  truncate flex items-center gap-1">
      <Camera className="w-[14px]" />
      Imagem
    </span>
  );
};

const DocumentItem = () => {
  return (
    <span className="text-muted-foreground text-sm truncate flex items-center gap-1">
      <File className="w-[14px]" />
      Documento
    </span>
  );
};

const AudioItem = () => {
  return (
    <span className="text-muted-foreground text-sm truncate flex items-center gap-1">
      <Mic className="w-[14px]" />
      Audio
    </span>
  );
};
