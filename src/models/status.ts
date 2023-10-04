export type ConversationWhatsapp = {
  id: string;
  origin: {
    type: string;
  };
};

export type Status = {
  id: string;
  status: string;
  timestamp: string;
  recipient_id: string;
  conversation: ConversationWhatsapp;
  pricing: {
    billable: boolean;
    pricing_model: string;
    category: string;
  };
};
