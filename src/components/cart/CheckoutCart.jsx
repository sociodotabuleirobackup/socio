import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { getCartSubtotal, removeFromCart } from '../../lib/cart';
 
const CheckoutCart = () => {
  const { cartItems, dispatch } = useContext(CartContext);

  const subtotal = getCartSubtotal(cartItems);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId, dispatch);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
      </div>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default CheckoutCart;