import React from "react";
import ReactDOM from "react-dom";
import { StoreContext } from "storeon/react";
import { store } from "../../store";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
