import { Template } from "@/models/template";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: Template[] = [];

const slice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    setTemplates(state, action) {
      return action.payload;
    },
  },
});

export const { setTemplates } = slice.actions;

export const selectTemplates = (state: RootState) => {
  return state.templates;
};

export default slice.reducer;
