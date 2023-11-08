import { Download, RefreshCcw } from "lucide-react";
import { TextBody } from "../text-body";
import { Message } from "postcss";
import { useEffect, useState } from "react";

export const DocumentBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  const [error, setError] = useState(false);
  const path = `http://localhost:3000/public/${message.id}`;
  const [blob, setBlob] = useState(new Blob());

  const fetchDocument = async () => {
    const response = await fetch(path);

    const blob = await response.blob();

    setBlob(blob);
  };

  useEffect(() => {
    fetchDocument()
      .then(() => {
        console.log(blob);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error)
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
      <a target="_blank" href={path} className="flex gap-2 p-2">
        <h1>Documento: </h1>

        <Download />
      </a>

      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
