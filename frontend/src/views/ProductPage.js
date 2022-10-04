import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

// axios
import axios from "axios";

// bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

// components
import Loading from "../components/Loading";
import Message from "../components/Message";

// store
import { Store } from "../Store";

// reducer func
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// component
const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const respnose = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: respnose.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const handleLocation = () => {
    navigate("/products");
  };
  const handleAddToCart = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  // template
  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger" message={error}></Message>
  ) : (
    <Container className="pt-5">
      <Row>
        <Col
          md={12}
          className="p-2 mb-2"
          style={{ cursor: "pointer" }}
          onClick={handleLocation}
        >
          <i class="fa-solid fa-angle-left fa-2xl"></i>
        </Col>
        <Col md={6} className="product-img-wrap rounded">
          <img src={product.image} alt={product.name} />
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <ListGroup variant="flush">
            <ListGroup.Item className="ps-0 ps-md-3">
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item className="fs-5 ps-0 ps-md-3">
              Price: {product.price} $
            </ListGroup.Item>
            <ListGroup.Item className="fs-5 ps-0 ps-md-3">
              Status:{" "}
              {product.countInStock < 1 ? (
                <Badge bg="danger">Unavailable</Badge>
              ) : (
                <Badge bg="success">Avaible</Badge>
              )}
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <div>
                <Button onClick={handleAddToCart} className="mt-3">
                  Add to card
                </Button>
              </div>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
