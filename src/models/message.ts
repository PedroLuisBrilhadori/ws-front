export type Message = {
  id: string;
  status: string;
  message: string;
  timestamp: string;
  me?: boolean;
  type: "image" | "text";
  to: string;
};

export type DayMessages = {
  day: string;
  messages: Message[];
};
