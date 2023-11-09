import { Download, RefreshCcw } from "lucide-react";
import { TextBody } from "../text-body";
import { Message } from "postcss";
import { useEffect, useState } from "react";

export type Media = {
  id: string;
  storageUrl?: string;
  cacheName?: string;
  whatsappMediaId?: string;
  type: string;
  name: string;
  messageId: string;
  size: string;
};

export const DocumentBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  const [error, setError] = useState(false);
  const path = `http://localhost:3000/public/${message.id}`;
  const [info, setInfo] = useState<Media>();

  const fetchDocumentInfo = async () => {
    const response = await fetch(
      `http://localhost:3000/public/${message.id}/info`
    );

    const info = await response.json();

    setInfo(info);
  };

  useEffect(() => {
    fetchDocumentInfo()
      .then(() => {})
      .catch((error) => {
        setError(true);
      });
  }, []);

  if (!info || error)
    return (
      <div>
        <div className="cursor-pointer w-[300px] h-[100px] object-cover rounded-sm flex items-center justify-center">
          <div className="flex flex-col gap-2 mt-3 justify-center items-center">
            <RefreshCcw
              className="w-[24px] h-[24px]"
              onClick={() => setError(false)}
            />
            Falha ao carregar a documento
          </div>
        </div>

        <TextBody text={message.message} truncate={truncate} />
      </div>
    );

  return (
    <div>
      <a
        target="_blank"
        href={path}
        className="flex gap-2 p-2 items-center justify-between"
      >
        <div className="flex flex-col">
          <h1>Documento: {info.name} </h1>
          <p className="text-sm">size: {info.size} B</p>
        </div>

        <Download />
      </a>

      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
