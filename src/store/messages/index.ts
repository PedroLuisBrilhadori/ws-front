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
      let index;

      state.forEach((day, i) => {
        const today = new Date(Number(action.payload.timestamp) * 1000)
          .toJSON()
          .split("T")[0];

        if (day.day.includes(today)) index = i;

        return day;
      });

      index && state[index].messages.push(action.payload);

      return state;
    },
    updateMessage(state, action) {
      let dayIndex;
      let index;

      state.forEach((day, dayI) => {
        day.messages.forEach((message, i) => {
          if (message.id == action.payload.id) {
            dayIndex = dayI;
            index = i;
          }
        });
      });

      if (!index || !dayIndex) return state;

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
