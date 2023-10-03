import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Conversation } from "@/models";

const initialState: Conversation | false = false;

const slice = createSlice({
  name: "currentConversation",
  initialState,
  reducers: {
    setCurrentConversation(state, action) {
      return action.payload;
    },
  },
});

export const { setCurrentConversation } = slice.actions;

export const selectCurrentConversation = (state: RootState) => {
  return state.currentConversation;
};

export default slice.reducer;
