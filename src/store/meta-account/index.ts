import { MetaAccount } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: MetaAccount[] = [];

const slice = createSlice({
  name: "metaAccount",
  initialState,
  reducers: {
    setMetaAccounts(state, action) {
      return action.payload;
    },
    addMetaAccount(state, action) {
      state.push(action.payload);
      return state;
    },
    removeMetaAccount(state, action) {
      return state.filter((account) => account.id !== action.payload.id);
    },
  },
});

export const { setMetaAccounts, addMetaAccount, removeMetaAccount } =
  slice.actions;

export const selectMetaAccounts = (state: RootState) => {
  return state.metaAccount;
};

export default slice.reducer;
