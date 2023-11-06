import { useState, useRef } from "react";
import RecordRTC from "recordrtc";

type RecorderState = "inactive" | "recording" | "paused";

type RecorderResult = {
  start: () => void;
  stop: () => Promise<Blob>;
  state: RecorderState;
};

export const useRecorder = (): RecorderResult => {
  const [state, setState] = useState<RecorderState>("inactive");
  const mediaRecorderRef = useRef<RecordRTC | null>(null);

  const start = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new RecordRTC(stream, {
        mimeType: "audio/wav",
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.startRecording();
      setState("recording");
    });
  };

  const stop = async (): Promise<Blob> => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder) {
        throw new Error("MediaRecorder not initialized");
      }

      mediaRecorder.stopRecording(() => {
        const blob = mediaRecorder.getBlob();

        resolve(blob);
        setState("inactive");
      });
    });
  };

  return { start, stop, state };
};
