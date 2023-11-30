import { Download, RefreshCcw } from "lucide-react";
import { TextBody } from "../text-body";
import { useEffect, useState } from "react";
import { Message } from "@/models";
import { baseUrl } from "@/services";
import { useUserHeaders } from "@/hooks";

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
  const me = message.me;
  const [error, setError] = useState(false);
  const path = `${baseUrl}/public/${message.id}`;
  const [info, setInfo] = useState<Media>();
  const { headers, user } = useUserHeaders();

  const stype = me ? `bg-[#025144]` : `bg-[#1D282F]`;

  const fetchDocumentInfo = async () => {
    const response = await fetch(`${baseUrl}/public/${message.id}/info`, {
      headers,
    });

    const info = await response.json();

    setInfo(info);
  };

  useEffect(() => {
    if (user.id)
      fetchDocumentInfo()
        .then(() => {})
        .catch((error) => {});
  }, [user]);

  if (!info)
    return (
      <div>
        <div className="cursor-pointer w-[300px] h-[100px] object-cover rounded-sm flex items-center justify-center">
          <div className="flex flex-col gap-2 mt-3 justify-center items-center">
            <RefreshCcw
              className="w-[24px] h-[24px]"
              onClick={() => fetchDocumentInfo()}
            />
            Falha ao carregar a documento
          </div>
        </div>

        <TextBody text={message.message} truncate={truncate} />
      </div>
    );

  return (
    <div className="flex flex-col justify-between gap-1">
      <a
        target="_blank"
        href={path}
        className={`flex gap-2 p-2 items-center justify-between rounded-sm ${stype}`}
      >
        <div className="flex flex-col">
          <h1>Documento: {info.name} </h1>
          <p className="text-sm">size: {Number(info.size) / 1000} KB</p>
        </div>

        <Download />
      </a>

      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
