import React from "react";
import ReactDOM from "react-dom/client";

// router
import { BrowserRouter as Router } from "react-router-dom";

// styles
import "./index.scss";

// app
import App from "./App";

// store
import { StoreProvider } from "./Store";

// paypal provider
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <PayPalScriptProvider
          deferLoading={true}
          options={{ components: "buttons" }}
        >
          <App />
        </PayPalScriptProvider>
      </Router>
    </StoreProvider>
  </React.StrictMode>
);
