import { configureStore } from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";

import responseReducer from "./responses";

const PERSISTED_KEYS = {
  states: ["responses"],
  namespace: "app",
};

const store = configureStore({
  reducer: { responses: responseReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save(PERSISTED_KEYS)),
  preloadedState: load(PERSISTED_KEYS),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
