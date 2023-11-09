import { RefreshCcw } from "lucide-react";
import { TextBody } from "../text-body";
import { Message } from "postcss";
import { useState } from "react";

export const ImageBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  const path = `http://localhost:3000/public/${message.id}?buffer=true`;

  const [error, setError] = useState(false);

  if (error)
    return (
      <div>
        <div className="cursor-pointer w-[300px] h-[300px] object-cover rounded-sm flex items-center justify-center">
          <div className="flex flex-col gap-2 mt-3 justify-center items-center">
            <RefreshCcw
              className="w-[24px] h-[24px]"
              onClick={() => setError(false)}
            />
            Falha ao carregar a imagem
          </div>
        </div>

        <TextBody text={message.message} truncate={truncate} />
      </div>
    );

  return (
    <div>
      <a target="_blank" href={path}>
        <img
          onError={() => {
            setError(true);
          }}
          className="w-[300px] h-[300px] object-cover rounded-sm"
          src={path}
        />
      </a>

      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
