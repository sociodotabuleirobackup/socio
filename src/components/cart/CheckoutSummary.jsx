import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '@/contexts/CartContext';
import { calculateAge, checkTransactionFraud } from '@/lib/utils';

const CheckoutSummary = () => {
  const { cartItems, clearCart, getSubtotal } = useContext(CartContext);
  const [formData, setFormData] = useState({
    customerName: '',
    cardholderName: '',
    billingCity: '',
    shippingCity: '',
    birthDate: '',
    paymentMethod: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setLoading(true);
    setMessage('');
    const transactionData = {
      transaction_id: `TX_${Date.now()}`,
      customer_name: formData.customerName,
      cardholder_name: formData.cardholderName,
      purchase_location: formData.billingCity,
      user_location: formData.shippingCity,
      customer_age: calculateAge(formData.birthDate)
    };

    const fraudCheck = await checkTransactionFraud(transactionData);
    if (fraudCheck.approved) {
      setMessage(fraudCheck.message);
    } else {
      setMessage(fraudCheck.message);
    }
    setLoading(false);
  };

    const handleConfirm = async () => {
      setLoading(true);
      setMessage('Confirming order...');
      try {
        const subtotal = getSubtotal();
        const orderData = {
          formData,
          items: cartItems,
          total: subtotal,
        };
        const response = await axios.post('http://localhost:3000/create-order', orderData);
        if (response.status === 200) {
          setMessage('Order confirmed successfully!');
          clearCart();
          setFormData({
            customerName: '',
            cardholderName: '',
            billingCity: '',
            shippingCity: '',
            birthDate: '',
            paymentMethod: '',
          });
        } else {
          setMessage('Error confirming order. Please try again.');
        }
      } catch (error) {
        console.error('Error confirming order:', error);
        setMessage('Error confirming order. Please try again.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h2>Checkout Summary</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <p>Total: ${getSubtotal()}</p>

      <h3>Shipping Information</h3>
      <input type="text" name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleInputChange} />
      <input type="text" name="shippingCity" placeholder="Shipping City" value={formData.shippingCity} onChange={handleInputChange} />

      <h3>Payment Information</h3>
      <input type="text" name="cardholderName" placeholder="Cardholder Name" value={formData.cardholderName} onChange={handleInputChange} />
      <input type="text" name="billingCity" placeholder="Billing City" value={formData.billingCity} onChange={handleInputChange} />
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
        <option value="">Select Payment Method</option>
        <option value="creditCard">Credit Card</option>
        <option value="bankSlip">Bank Slip</option>
      </select>
      <button onClick={handleCheckout} disabled={loading}>
        Check Fraud
      </button>
      <button onClick={handleConfirm} disabled={loading || !message.includes('approved')}>
        Confirm Order
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckoutSummary;