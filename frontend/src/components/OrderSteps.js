import React from "react";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// styles
import "./OrderSteps.scss";

const OrderSteps = (props) => {
  return (
    <Row className="order-steps mb-4">
      <Col className={props.step1 ? "active" : ""}>Sign-in</Col>
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      <Col className={props.step3 ? "active" : ""}>Payment</Col>
      <Col className={props.step4 ? "active" : ""}>Place order</Col>
    </Row>
  );
};

export default OrderSteps;
