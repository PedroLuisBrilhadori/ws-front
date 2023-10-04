export type Message = {
  id: string;
  status: string;
  message: string;
  timestamp: string;
  me?: boolean;
  to: string;
};

export type DayMessages = {
  day: string;
  messages: Message[];
};
