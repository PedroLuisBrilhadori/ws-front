import { useState, useRef } from "react";

type RecorderState = "inactive" | "recording" | "paused";

type RecorderResult = {
  start: () => void;
  stop: () => Promise<Blob>;
  state: RecorderState;
};

export const useRecorder = (): RecorderResult => {
  const [state, setState] = useState<RecorderState>("inactive");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunksRef.current.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        setState("inactive");
      });

      mediaRecorder.start();
      setState("recording");
    });
  };

  const stop = async (): Promise<Blob> => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder) {
        throw new Error("MediaRecorder not initialized");
      }

      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/ogg",
        });
        chunksRef.current = [];
        resolve(blob);
      });

      mediaRecorder.stop();
      setState("inactive");
    });
  };

  return { start, stop, state };
};
