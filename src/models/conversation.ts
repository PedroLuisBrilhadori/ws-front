export type Conversation = {
  id: string;
  message: string;
  status: string;
  timestamp: string;
  to?: string;
  from?: string;
};
