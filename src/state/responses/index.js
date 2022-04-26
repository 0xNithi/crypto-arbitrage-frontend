import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exchanges: [],
  tokens: [],
};

export const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    addExchanges: (state, { payload: { exchanges } }) => {
      state.exchanges = exchanges;
    },
    addTokens: (state, { payload: { tokens } }) => {
      state.tokens = tokens;
    },
  },
});

export const { addExchanges, addTokens } = responseSlice.actions;

export default responseSlice.reducer;
