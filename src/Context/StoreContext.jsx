import React, { createContext, useReducer, useEffect } from "react";
import Storage from "../Utils/Storage";

// Initial state setup with products and cart items loaded from localStorage
const initialState = {
  products: Storage.loadProducts(),
  cart: Storage.loadCartItems() || [],
};

// Creating a context with default values
const StoreContext = createContext({
  state: initialState,
  dispatch: () => null,
});

// Reducer function to manage state updates based on dispatched actions
const storeReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_SAMPLE_DATA": {
      const { products } = action.payload;
      return { ...state, products };
    }
    case "UPDATE_PRODUCT": {
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );

      const updatedCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, ...action.payload };
        }
        return cartItem;
      });

      return { ...state, products: updatedProducts, cart: updatedCart };
    }

    case "ADD_TO_CART": {
      const existingCartItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedCart = [...state.cart];

      if (existingCartItemIndex >= 0) {
        const updatedItem = {
          ...updatedCart[existingCartItemIndex],
          quantity: updatedCart[existingCartItemIndex].quantity + 1,
        };
        updatedCart[existingCartItemIndex] = updatedItem;
      } else {
        updatedCart.push({ ...action.payload, quantity: 1 });
      }

      return { ...state, cart: updatedCart };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, cart: updatedCart };
    }

    case "INCREASE_QUANTITY": {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return { ...state, cart: updatedCart };
    }

    case "DECREASE_QUANTITY": {
      const updatedCart = state.cart
        .map((item) => {
          if (item.id === action.payload.productId) {
            const newQuantity = Math.max(item.quantity - 1, 0);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      return { ...state, cart: updatedCart };
    }

    case "ADD_PRODUCT": {
      const newProduct = { ...action.payload, id: Date.now() };
      const updatedProducts = [...state.products, newProduct];
      return { ...state, products: updatedProducts };
    }
    case "SET_PRODUCTS": {
      return { ...state, products: action.payload };
    }
    default:
      return state;
  }
};

// StoreProvider component wraps children in the StoreContext.Provider, passing down the state and dispatch
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  //load products from JSON if not already in localStorage
  useEffect(() => {
    const productsInStorage = Storage.loadProducts();
    if (productsInStorage.length === 0) {
      fetch("/products.json")
        .then((response) => response.json())
        .then((productsFromJson) => {
          Storage.saveProducts(productsFromJson);
          dispatch({ type: "SET_PRODUCTS", payload: productsFromJson });
        })
        .catch((error) => console.error("Failed to load products", error));
    } else {
      dispatch({ type: "SET_PRODUCTS", payload: productsInStorage });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;