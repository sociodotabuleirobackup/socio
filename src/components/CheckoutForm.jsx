import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/transactions';
const FRAUD_SCORE_THRESHOLD = 80;

function CheckoutForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    cardholderName: '',
    billingCity: '',
    shippingCity: '',
    birthDate: '',
  });
  const [checkoutResult, setCheckoutResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const checkTransactionFraud = async (transactionData) => {
    try {
      const response = await axios.post(API_URL, [transactionData], {
        headers: { 'Content-Type': 'application/json' },
      });
      const result = response.data[0];
      const fraudScore = result.score;

      if (fraudScore > FRAUD_SCORE_THRESHOLD) {
        return {
          approved: false,
          message: `Transaction rejected: High fraud risk (score: ${fraudScore})`,
        };
      } else {
        return {
          approved: true,
          message: `Transaction approved (score: ${fraudScore})`,
        };
      }
    } catch (err) {
      console.error('Error contacting anti-fraud API:', err.message);
      return {
        approved: false,
        message: 'Error checking transaction for fraud. Please try again.',
      };
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setCheckoutResult(null);

    const transactionData = {
      transaction_id: `TX_${Date.now()}`,
      customer_name: formData.customerName,
      cardholder_name: formData.cardholderName,
      purchase_location: formData.billingCity || 'Unknown',
      user_location: formData.shippingCity || 'Unknown',
      customer_age: calculateAge(formData.birthDate),
    };

    try {
      const fraudCheck = await checkTransactionFraud(transactionData);
      setCheckoutResult(fraudCheck);
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error('Unexpected error during checkout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleCheckout}>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardholderName">Cardholder Name:</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="billingCity">Billing City:</label>
          <input
            type="text"
            id="billingCity"
            name="billingCity"
            value={formData.billingCity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="shippingCity">Shipping City:</label>
          <input
            type="text"
            id="shippingCity"
            name="shippingCity"
            value={formData.shippingCity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Checkout'}
        </button>
      </form>

      {checkoutResult && (
        <div className={checkoutResult.approved ? 'success' : 'error'}>
          {checkoutResult.message}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default CheckoutForm;