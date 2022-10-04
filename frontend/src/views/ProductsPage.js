import React, { useEffect, useReducer } from "react";

// axios
import axios from "axios";

// components
import Product from "../components/Product";
import Message from "../components/Message";
import Loading from "../components/Loading";

// styles
import "./ProductsPage.scss";

// reducer func
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductsPage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-5">
      <h1 className="text-center">Products</h1>
      <ul className="d-flex justify-content-center flex-wrap p-0">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger" message={error}></Message>
        ) : (
          products.map((product) => (
            <Product product={product} key={product.slug} />
          ))
        )}
      </ul>
    </div>
  );
}
