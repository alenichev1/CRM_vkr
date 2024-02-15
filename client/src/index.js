import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createContext } from "react";
import UserCrm from "./store/UserCrm";
import ApplicationCrm from "./store/ApplicationCrm";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserCrm(),
      application: new ApplicationCrm(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
