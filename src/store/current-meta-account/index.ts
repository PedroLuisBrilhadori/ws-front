import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { MetaAccount } from "@/models";

const initialState: MetaAccount = {
  id: "",
};

const slice = createSlice({
  name: "currentMetaAccount",
  initialState,
  reducers: {
    setCurrentMetaAccounts(state, action) {
      return action.payload;
    },
    clearCurrentMetaAccount(state) {
      return initialState;
    },
  },
});

export const { setCurrentMetaAccounts, clearCurrentMetaAccount } =
  slice.actions;

export const selectCurrentMetaAccount = (state: RootState) => {
  return state.currentMetaAccount;
};

export default slice.reducer;
