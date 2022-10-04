import React, { useContext, useEffect, useState } from "react";

// bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// styles
import "./SignInPage.scss";

// components
import OrderSteps from "../components/OrderSteps";

// store
import { Store } from "../Store";

// router
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodValue, setPaymentMethodValue] = useState(
    paymentMethod || "PayPal"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodValue });
    localStorage.setItem("paymentMethod", paymentMethodValue);
    navigate("/placeorder");
  };
  return (
    <Container className="small-container pt-5">
      <OrderSteps step1 step2 step3 />
      <h1 className="text-center">Payment method</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodValue === "PayPal"}
            onChange={(e) => setPaymentMethodValue(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodValue === "Stripe"}
            onChange={(e) => setPaymentMethodValue(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Button type="submit">Continue</Button>
        </div>
      </Form>
    </Container>
  );
};

export default PaymentPage;
