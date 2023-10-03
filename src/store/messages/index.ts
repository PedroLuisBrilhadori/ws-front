import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Message } from "@/models";

const initialState: Message[] = [];

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      state.push(action.payload);
      return state;
    },
  },
});

export const { setMessages, addMessage } = slice.actions;

export const selectMessage = (state: RootState) => {
  return state.messages;
};

export default slice.reducer;
