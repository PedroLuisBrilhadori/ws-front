import { useRecorder } from "@/hooks/use-recorder";
import { useTimer } from "@/hooks/use-timer";
import { baseUrl } from "@/services";
import { Send, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export type RecorderProps = {
  recordHandler: (record: boolean) => void;
};

export const Recorder = ({ recordHandler }: RecorderProps) => {
  const { state, start, stop } = useRecorder();
  const { to } = useParams();

  useEffect(() => {
    start();
  }, []);

  const close = () => {
    stop().then((data) => {
      console.log(data);
    });
    recordHandler(false);
  };

  const send = () => {
    stop().then(async (data) => {
      const formData = new FormData();
      formData.append("file", data);

      const url = `${baseUrl}/messages/image`;

      const response = await fetch(`${url}/${to}`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
    });
  };

  return (
    <div className="flex gap-2">
      <Trash2 className="cursor-pointer" onClick={close} />
      <Timer />
      <Send className="cursor-pointer" onClick={send} />
    </div>
  );
};

const Timer = () => {
  const time = useTimer();

  return <>{time}</>;
};
