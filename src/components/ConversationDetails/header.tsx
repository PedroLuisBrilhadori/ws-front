import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type ConversationHeaderProps = {
  image: string;
  contactName: string;
};

export const ConversationHeader = ({
  image,
  contactName,
}: ConversationHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full">
      <div className="flex justify-between items-center bg-[#202c33] w-full h-14 px-4">
        <ArrowLeft
          className="cursor-pointer text-white"
          onClick={() => {
            navigate(`/`);
          }}
        />

        <div className="flex items-center gap-4 h-full">
          <h1 className="text-white font-normal">{contactName}</h1>
        </div>
      </div>
    </div>
  );
};
