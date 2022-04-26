import { configureStore } from "@reduxjs/toolkit";

import responseReducer from "./responses";

const store = configureStore({
  reducer: { responses: responseReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
