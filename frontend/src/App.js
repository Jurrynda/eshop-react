import React from "react";

// styles
import "./App.scss";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// components
import TheHeaderNav from "./components/Header";
import TheFooter from "./components/Footer";

// views
import ProductsPage from "./views/ProductsPage";
import HomePage from "./views/HomePage";
import ProductPage from "./views/ProductPage";
import CartPage from "./views/CartPage";
import SignInPage from "./views/SignInPage";
import ShippingPage from "./views/ShippingPage";
import SignUpPage from "./views/SignUpPage";
import PaymentPage from "./views/PaymentPage";
import PlaceOrderPage from "./views/PlaceOrderPage";
import OrderHistoryPage from "./views/OrderHistoryPage";
import UserProfilePage from "./views/UserProfilePage";

// router
import { Route, Routes } from "react-router-dom";
import OrderPage from "./views/OrderPage";

// component
function App() {
  // template
  return (
    <div className="App">
      <header>
        <TheHeaderNav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/orderhistory" element={<OrderHistoryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
        </Routes>
      </main>
      <footer>
        <TheFooter />
      </footer>
    </div>
  );
}

export default App;
