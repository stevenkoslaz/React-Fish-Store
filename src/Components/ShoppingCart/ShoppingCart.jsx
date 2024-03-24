import React, { useContext } from "react";
import StoreContext from "../../Context/StoreContext";
import CartItem from "./CartItem";

import "./ShoppingCart.css";

const ShoppingCart = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // dispatch an action to remove an item from the cart
  const onRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="shopping-cart">
      <h2> SHOPPING CART</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item-container" key={item.id}>
            <CartItem
              item={item}
              onRemoveFromCart={() => onRemoveFromCart(item.id)}
            />
          </div>
        ))}
      </div>
      <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
    </div>
  );
};

export default ShoppingCart;