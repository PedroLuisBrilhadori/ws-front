import Avatar from "../Avatar";

export type ConversationHeaderProps = {
  image: string;
  contactName: string;
};

export const ConversationHeader = ({
  image,
  contactName,
}: ConversationHeaderProps) => {
  return (
    <div className="flex justify-between w-full px-4">
      <div className="flex justify-between bg-[#202c33] w-full h-14">
        <div className="flex items-center gap-4 h-full">
          <Avatar width="w-10" height="h-10" image={image} />
          <h1 className="text-white font-normal">{contactName}</h1>
        </div>
      </div>
    </div>
  );
};
