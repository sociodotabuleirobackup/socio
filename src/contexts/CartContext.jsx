import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems[product.id];
      if (existingItem) {
        return {
          ...prevItems,
          [product.id]: {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          },
        };
      } else {
        return {
          ...prevItems,
          [product.id]: { ...product, quantity },
        };
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      delete newItems[productId];
      return newItems;
    });
  };

  const updateCartItem = (productId, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems[productId];
      if (existingItem) {
        return {
          ...prevItems,
          [productId]: {
            ...existingItem,
            quantity: quantity,
          },
        };
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};