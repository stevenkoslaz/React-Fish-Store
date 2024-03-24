import React, { useContext, useEffect } from "react";
import StoreContext from "../../Context/StoreContext";
import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { products } = state;

  //fetch product data from a local JSON file and update the global state
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }))
      .catch((error) => console.error("Failed to load products", error));
  }, [dispatch]);

  // handle adding a product to the cart
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="product-list">
      <h1>FISH STORE</h1>
      <h2>OUR PRODUCT LIST</h2>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
