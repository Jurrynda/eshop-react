import React, { useContext } from "react";

// router
import { Link, NavLink } from "react-router-dom";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";

// assets
import logo from "../assets/bootstrap-logo.svg";

// store
import { Store } from "../Store";

// toastify
import { ToastContainer } from "react-toastify";

// component
const TheHeaderNav = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const handleSignOut = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  // template
  return (
    <Navbar expand="md" className="p-3 shadow-lg" bg="dark" variant="dark">
      <ToastContainer position="bottom-center" limit={1}></ToastContainer>
      <Container>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
              <NavLink to="/products" className="nav-link">
                Eshop
              </NavLink>
              <NavLink to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="info">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </NavLink>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavDropdown.Item>
                    <NavLink to="/profile" className="nav-link text-dark">
                      User profile
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink to="/orderhistory" className="nav-link text-dark">
                      Order history
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={handleSignOut}
                    className="text-center"
                  >
                    Sing out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink to="/signin" className="nav-link">
                  Sign-in
                </NavLink>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default TheHeaderNav;
