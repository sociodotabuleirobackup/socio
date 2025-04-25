// src/lib/cart.js

export const addToCart = (cartItems, product, quantity = 1) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === product.id && item.type === product.type
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id && item.type === product.type
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cartItems, { ...product, quantity }];
};

export const removeFromCart = (cartItems, productId, productType) => {
  return cartItems.filter(
    (item) => !(item.id === productId && item.type === productType)
  );
};

export const updateCartItem = (cartItems, productId, productType, newQuantity) => {
  return cartItems.map((item) =>
    item.id === productId && item.type === productType
      ? { ...item, quantity: newQuantity }
      : item
  );
};

export const clearCart = () => {
  return [];
};

export const getCartSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};