import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Media } from "@/models";

const initialState: Media[] = [];

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setMedias(state, action) {
      return action.payload;
    },
  },
});

export const { setMedias } = slice.actions;

export const selectMedia = (state: RootState) => {
  return state.media;
};

export default slice.reducer;
