export type Message = {
  id: string;
  status: string;
  message: string;
  timestamp: string;
  me?: boolean;
  type: "image" | "text" | "audio" | "document";
  to: string;
};

export type DayMessages = {
  day: string;
  messages: Message[];
};
