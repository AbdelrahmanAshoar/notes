import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
