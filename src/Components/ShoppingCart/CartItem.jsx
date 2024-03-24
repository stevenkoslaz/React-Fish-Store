import React, { useContext } from "react";
import StoreContext from "../../Context/StoreContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { dispatch } = useContext(StoreContext);

  // Dispatches an action to remove the item from the cart
  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
  };

  // Dispatches an action to decrease the quantity of the item in the cart
  const handleDecreaseQuantity = (productId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { productId: productId } });
  };

  // Dispatches an action to increase the quantity of the item in the cart
  const handleIncreaseQuantity = (productId) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { productId: productId } });
  };

  const isAvailable = item.status === "available";

  return (
    <div className="cart-item">
      <div>
        <span className="quantity">
          {item.quantity} x {item.title} (${(item.price * item.quantity).toFixed(2)})
        </span>
      </div>
      <div className="rmv-buttons">
        <button
          className="addsub-button"
          onClick={() => handleDecreaseQuantity(item.id)}
        >
          -
        </button>

        <button
          className="addsub-button"
          onClick={() => handleIncreaseQuantity(item.id)}
          disabled={!isAvailable} 
          style={{ backgroundColor: isAvailable ? '' : 'rgba(128, 128, 128, 0.5)', cursor: isAvailable ? 'pointer' : 'default' }} 
        >
          +
        </button>
        <button className="remove-button" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
