import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversations";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
