import { RefreshCcw } from "lucide-react";
import { TextBody } from "../text-body";
import { Message } from "postcss";
import { useState } from "react";
import { baseUrl } from "@/services";

export const AudioBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  const path = `${baseUrl}/public/${message.id}`;

  const [error, setError] = useState(false);

  if (error)
    return (
      <div>
        <div className="cursor-pointer h-[50px] object-cover rounded-sm flex items-center justify-center">
          <div className="flex gap-2 justify-center items-center">
            Falha ao carregar a o audio
            <RefreshCcw
              className="w-[24px] h-[24px]"
              onClick={() => setError(false)}
            />
          </div>
        </div>

        <TextBody text={message.message} truncate={truncate} />
      </div>
    );

  return (
    <div>
      <audio
        controls
        onError={() => {
          setError(true);
        }}
      >
        <source src={path}></source>
      </audio>

      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
