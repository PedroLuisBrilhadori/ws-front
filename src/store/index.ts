import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversations";
import currentConversationReducer from "./currentConversation";
import messageReducer from "./messages";
import templateReducer from "./templates";
import userReducer from "./user";
import mediaReducer from "./media";
import metaAccountReducer from "./meta-account";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    currentConversation: currentConversationReducer,
    messages: messageReducer,
    templates: templateReducer,
    user: userReducer,
    media: mediaReducer,
    metaAccount: metaAccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
