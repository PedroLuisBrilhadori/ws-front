import { MediaInfo } from "@/components/MessageBalloon/messages/document";
import { useUserHeaders } from "@/hooks";
import { baseUrl } from "@/services";
import { Download, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export type DocumentColumnProps = {
  messageId: string;
};

export const DocumentColumn = ({ messageId }: DocumentColumnProps) => {
  const { headers, user } = useUserHeaders();
  const [info, setInfo] = useState<MediaInfo>();

  const path = `${baseUrl}/public/${messageId}?buffer=true`;

  const fetchDocumentInfo = async () => {
    const response = await fetch(`${baseUrl}/public/${messageId}/info`, {
      headers,
    });

    const info = await response.json();

    setInfo(info);
  };

  useEffect(() => {
    if (user.id) fetchDocumentInfo();
  }, [user]);

  if (!info)
    return (
      <div>
        <div className="cursor-pointer rounded-sm flex items-center justify-center">
          <div className="flex flex-col gap-2 mt-3 justify-center items-center">
            <RefreshCcw
              className="w-[24px] h-[24px]"
              onClick={() => fetchDocumentInfo()}
            />
            Falha ao carregar a documento
          </div>
        </div>
      </div>
    );

  return (
    <a
      target="_blank"
      href={path}
      className={`flex gap-2 p-2 items-center justify-between rounded-sm`}
    >
      <div className="flex flex-col">
        <h1>Documento: {info.name} </h1>
      </div>

      <Download />
    </a>
  );
};
