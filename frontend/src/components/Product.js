import React, { useContext } from "react";

// bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// axios
import axios from "axios";

// router
import { Link, useNavigate } from "react-router-dom";

// store
import { Store } from "../Store";

const Product = (props) => {
  const { product } = props;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const handleAddToCart = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
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

  return (
    <Card className="product-wrap">
      <Link to={`/product/${product.slug}`} className="product-img-wrap">
        <Card.Img variant="top" src={product.image} alt={product.slug} />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product.slug}`}
          className="text-decoration-none text-dark"
        >
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price} $</Card.Text>
        {product.countInStock === 0 ? (
          <Button disabled>Out of stock</Button>
        ) : (
          <Button variant="primary" onClick={() => handleAddToCart(product)}>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
