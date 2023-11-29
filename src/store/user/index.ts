import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { User } from "@/models";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  access_token: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = slice.actions;

export const selectUser = (state: RootState) => {
  return state.user;
};

export default slice.reducer;
