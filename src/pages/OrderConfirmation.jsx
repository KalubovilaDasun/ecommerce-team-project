import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { FaCheckCircle } from 'react-icons/fa';
import './OrderTheme.css';

const OrderConfirmation = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  
  const { items } = useCart();

  // මුළු මුදල මෙහිද ගණනය කිරීම
  const cartTotal = items ? items.reduce((sum, item) => sum + (item.price * item.qty), 0) : 0;
  
  const subtotal = cartTotal;
  const shippingFee = subtotal > 0 ? 15.00 : 0.00;
  const finalTotal = subtotal + shippingFee;

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      navigate('/track-order');
    }, 3000);
  };

  return (
    <div className="theme-page-container">
      {isConfirmed && (
        <div className="animation-overlay">
          <div className="success-modal">
            <FaCheckCircle className="success-icon" />
            <h2>Thank You!</h2>
            <p>Your order has been confirmed.</p>
          </div>
        </div>
      )}

      <div className="theme-content-box">
        <h1 className="theme-title">Confirm Your Order</h1>
        <p className="theme-subtitle">Review your final amount before placing the order.</p>

        <div className="order-summary-box">
          <div className="summary-row">
            <span>Products Amount</span>
            <span>$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Fee</span>
            <span>$ {shippingFee.toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total Price</span>
            <span>$ {finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button className="btn-theme-primary" onClick={handleConfirm}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;