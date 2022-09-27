import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import AuthProvider from "./context/AuthContext";



ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);