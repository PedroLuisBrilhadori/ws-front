import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Conversation } from "@/models";

const initialState: Conversation[] = [];

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations(state, action) {
      return action.payload;
    },
    addConversation(state, action) {
      return state.concat([action.payload]);
    },
  },
});

export const { setConversations, addConversation } = slice.actions;

export const selectConversations = (state: RootState) => {
  return state.conversation;
};

export default slice.reducer;
