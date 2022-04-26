import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./styles/index.css";

import App from "./App";
import store from "./state";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
