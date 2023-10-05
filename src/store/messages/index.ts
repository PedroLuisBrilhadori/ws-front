import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { DayMessages, Message } from "@/models";

const initialState: DayMessages[] = [];

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      let index = state.length - 1;

      state[index].messages.push(action.payload);

      return state;
    },
    updateMessage(state, action) {
      let dayIndex = state.length - 1;
      let index;

      state[dayIndex].messages.forEach((message, i) => {
        if (message.id == action.payload.id) {
          index = i;
        }
      });

      if (!index) return state;

      state[dayIndex].messages[index] = action.payload.update;

      return state;
    },
  },
});

export const { setMessages, addMessage, updateMessage } = slice.actions;

export const selectMessage = (state: RootState) => {
  return state.messages;
};

export default slice.reducer;
