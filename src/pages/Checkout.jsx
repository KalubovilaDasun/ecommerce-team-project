import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaUniversity, FaMoneyBillAlt, FaLock, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

// ඔබගේ CartContext ගොනුව ඇති නිවැරදි ස්ථානය මෙහි ලබා දෙන්න
import { CartContext } from '../context/CartContext.jsx';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingAddress, setBillingAddress] = useState('same');
  
  const navigate = useNavigate();
  
  // CartContext හරහා දත්ත ලබා ගැනීම
  const { cartItems, cartTotal } = useContext(CartContext);

  // මිල ගණන් ගණනය කිරීම (උදාහරණයක් ලෙස 5% ක බද්දක්)
  const subtotal = cartTotal ? cartTotal : 0;
  const tax = subtotal * 0.05;
  const finalTotal = subtotal + tax;

  return (
    <div className="checkout-container">
      {/* Hero Header Section */}
      <div className="checkout-header">
        <div className="header-content">
          <span className="secure-badge">SECURE CHECKOUT</span>
          <h1>Complete Your Purchase</h1>
          <p>Fast. Secure. Hassle-free.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="checkout-main">
        {/* Left Column: Form Area */}
        <div className="checkout-left">
          {/* Stepper */}
          <div className="stepper">
            <div className="step active"><span className="step-num">1</span> Payment</div>
            <div className="step-line"></div>
            <div className="step"><span className="step-num">2</span> Shipping</div>
            <div className="step-line"></div>
            <div className="step"><span className="step-num">3</span> Order Review</div>
            <div className="step-line"></div>
            <div className="step"><FaCheckCircle className="step-icon"/> Complete</div>
          </div>

          <div className="payment-section">
            <h2>Payment Method</h2>
            <p className="subtitle">Choose your preferred payment method</p>
            
            <div className="payment-options">
              <label className={`pay-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <div className="pay-icons"><FaCcVisa color="#1a1f71" size={24}/> <FaCcMastercard color="#eb001b" size={24}/></div>
                <span>Credit / Debit Card</span>
              </label>
              <label className={`pay-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                <FaPaypal color="#003087" size={20}/>
                <span>PayPal</span>
              </label>
              <label className={`pay-option ${paymentMethod === 'bank' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                <FaUniversity color="#333" size={20}/>
                <span>Bank Transfer</span>
              </label>
              <label className={`pay-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <FaMoneyBillAlt color="#333" size={20}/>
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="card-form-container">
                <div className="card-form">
                  <div className="input-group full-width">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 4567 7890 1234" />
                  </div>
                  <div className="input-group">
                    <label>Card Holder Name</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="input-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
                <div className="card-visual">
                  <div className="mock-credit-card">
                    <div className="chip"></div>
                    <div className="card-dots">.... .... ....</div>
                    <FaCcVisa className="card-visa-logo" size={40} />
                  </div>
                </div>
              </div>
            )}

            {/* Billing Address */}
            <div className="billing-section">
              <h3>Billing Address</h3>
              <p className="subtitle">Same as shipping address</p>
              <div className="billing-options">
                <label className="radio-label">
                  <input type="radio" name="billing" checked={billingAddress === 'same'} onChange={() => setBillingAddress('same')} />
                  Same as shipping
                </label>
                <label className="radio-label">
                  <input type="radio" name="billing" checked={billingAddress === 'different'} onChange={() => setBillingAddress('different')} />
                  Use a different address
                </label>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-back" onClick={() => navigate(-1)}>
                <MdOutlineKeyboardBackspace /> Back
              </button>
              <button className="btn-continue">Place Order &rarr;</button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="checkout-right">
          <div className="summary-card">
            <div className="summary-header">
              <h2>Order Summary</h2>
              <span className="total-top">$ {finalTotal.toFixed(2)}</span>
            </div>
            
            <div className="cost-breakdown">
              <div className="cost-row"><span>Subtotal</span><span>$ {subtotal.toFixed(2)}</span></div>
              <div className="cost-row"><span>Shipping</span><span>Free</span></div>
              <div className="cost-row"><span>Tax (5%)</span><span>$ {tax.toFixed(2)}</span></div>
            </div>

            {/* Dynamic Cart Items */}
            <div className="cart-items">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div className="cart-item" key={index}>
                    <img 
                      src={item.image || item.img} 
                      alt={item.name} 
                      style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f0f0f0' }} 
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.color || 'Default'}</p>
                      <div className="item-price-row">
                        <span>x {item.quantity || 1}</span>
                        <strong>$ {(item.price * (item.quantity || 1)).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '14px', color: '#888' }}>ඔබගේ Cart එකෙහි කිසිදු භාණ්ඩයක් නොමැත.</p>
              )}
            </div>

            <div className="secure-payment-badge">
              <div className="badge-text">
                <FaLock className="lock-icon" />
                <div>
                  <strong>Your payment is secure</strong>
                  <p>We use industry-standard encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;