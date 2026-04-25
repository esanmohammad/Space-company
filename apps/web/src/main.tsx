import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { spaceTheme } from "@space-tourism/ui";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={spaceTheme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
