import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Conversation } from "@/models";

const initialState: {
  current?: Conversation;
  conversations: Conversation[];
} = {
  conversations: [],
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations(state, action) {
      return action.payload;
    },
    setCurrentConversation(state, action) {
      state.current = action.payload;
      return state;
    },
  },
});

export const { setConversations, setCurrentConversation } = slice.actions;

export const selectConversations = (state: RootState) => {
  return state.conversation;
};

export default slice.reducer;
