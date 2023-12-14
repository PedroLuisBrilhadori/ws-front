export type Conversation = {
  id: string;
  to: string;
  name: string;
  companyId: string;
  messageId: string;
  message: string;
  status: string;
  timestamp: string;
  type?: string;
  unread: string;
};
