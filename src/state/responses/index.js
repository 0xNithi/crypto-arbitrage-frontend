import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastPricesFetch: undefined,
  exchanges: [],
  tokens: [],
};

export const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    addExchanges: (state, { payload: { exchanges } }) => {
      state.exchanges = exchanges;
      state.lastPricesFetch = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()} `;
    },
    addTokens: (state, { payload: { tokens } }) => {
      state.tokens = tokens;
    },
  },
});

export const { addExchanges, addTokens } = responseSlice.actions;

export default responseSlice.reducer;
