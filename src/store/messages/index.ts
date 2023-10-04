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
      const newState = state.map((day) => {
        const today = `${new Date()
          .toJSON()
          .split("T")
          .map((s, i) => (i == 1 ? "00:00:00.000Z" : s))
          .join("T")}`;

        console.log(day.day == today);
        console.log(today);

        if (today == day.day) {
          day.messages.push(action.payload);
        }

        return day;
      });

      return newState;
    },
  },
});

export const { setMessages, addMessage } = slice.actions;

export const selectMessage = (state: RootState) => {
  return state.messages;
};

export default slice.reducer;
