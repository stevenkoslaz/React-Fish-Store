import React from "react";
import "./ProductItem.css";

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      {product.status === "unavailable" && (
        <img id="availability" src="images/unavailable.png" alt="Unavailable" />
      )}
      <img id="product-image" src={product.image} alt={product.title} />
      <div className="product-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p id="price">${parseFloat(product.price).toFixed(2)}</p>
        <button
          onClick={() => onAddToCart()}
          disabled={product.status === "unavailable"}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;