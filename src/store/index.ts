import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversations";
import currentConversationReducer from "./currentConversation";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    currentConversation: currentConversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
