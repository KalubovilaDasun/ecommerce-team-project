import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaUniversity, FaMoneyBillAlt, FaLock, FaCheckCircle, FaExclamationCircle, FaCcAmex, FaCcDiscover, FaCreditCard } from 'react-icons/fa';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useCart } from '../context/CartContext.jsx';

const Checkout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [billingAddress, setBillingAddress] = useState('same');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  
  const [cardType, setCardType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const { items } = useCart();

  const cartTotal = items ? items.reduce((sum, item) => sum + (item.price * item.qty), 0) : 0;
  const subtotal = cartTotal;
  const tax = subtotal * 0.05;
  const finalTotal = subtotal + tax;

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardDetails({ ...cardDetails, number: value });

    const cleanNum = value.replace(/\s+/g, '');
    
    if (/^4/.test(cleanNum)) {
      setCardType('Visa');
    } else if (/^5[1-5]/.test(cleanNum)) {
      setCardType('Mastercard');
    } else if (/^3[47]/.test(cleanNum)) {
      setCardType('Amex');
    } else if (/^6/.test(cleanNum)) {
      setCardType('Discover');
    } else {
      setCardType('');
    }
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'Visa': return <FaCcVisa color="#1a1f71" size={28} />;
      case 'Mastercard': return <FaCcMastercard color="#eb001b" size={28} />;
      case 'Amex': return <FaCcAmex color="#2e77bc" size={28} />;
      case 'Discover': return <FaCcDiscover color="#ff6000" size={28} />;
      default: return <FaCreditCard color="#ccc" size={28} />;
    }
  };

  const handleContinue = () => {
    if (!paymentMethod) {
      setErrorMsg('Please select a payment method to continue.');
      return;
    }
    
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        setErrorMsg('Please fill in all credit/debit card details.');
        return;
      }

      const cleanCardNum = cardDetails.number.replace(/\s+/g, '');
      const isAmex = cardType === 'Amex';
      const expectedLength = isAmex ? 15 : 16;
      
      // 1. ඉලක්කම් ගණන පරීක්ෂා කිරීම
      if (cleanCardNum.length !== expectedLength) {
        setErrorMsg(`Invalid ${cardType || 'Card'} Number. It must be exactly ${expectedLength} digits.`);
        return;
      }

      // 2. Luhn Algorithm (කාඩ්පතේ සැබෑ වලංගුතාව පරීක්ෂා කිරීම)
      const validateLuhn = (cardNumber) => {
        let sum = 0;
        let isSecond = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
          let d = parseInt(cardNumber[i], 10);
          if (isSecond) {
            d = d * 2;
            if (d > 9) d -= 9;
          }
          sum += d;
          isSecond = !isSecond;
        }
        return sum % 10 === 0;
      };

      if (!validateLuhn(cleanCardNum)) {
        setErrorMsg(`The ${cardType || 'Card'} number entered is mathematically invalid (Fake Card).`);
        return;
      }

      // 3. කල් ඉකුත්වීමේ දිනය පරීක්ෂා කිරීම
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiry)) {
        setErrorMsg('Invalid Expiry Date. Please use MM/YY format (e.g., 12/25).');
        return;
      }

      // 4. CVV අංකය පරීක්ෂා කිරීම
      const expectedCvvLength = isAmex ? 4 : 3;
      if (cardDetails.cvv.length !== expectedCvvLength) {
        setErrorMsg(`Invalid CVV for ${cardType || 'Card'}. It must be ${expectedCvvLength} digits.`);
        return;
      }
    }

    setErrorMsg('');
    navigate('/order-confirmation');
  };

  if (!isLoggedIn) {
    return (
      <div className="theme-page-container">
        <div className="theme-content-box" style={{ maxWidth: '450px' }}>
          <h2 className="theme-title">Account Login Required</h2>
          <p className="theme-subtitle">Please log in to your account to place this order securely.</p>
          
          <button className="btn-theme-primary" onClick={() => setIsLoggedIn(true)} style={{ marginBottom: '15px' }}>
            Log In
          </button>
          
          <button className="btn-theme-outline" style={{ width: '100%', marginTop: '0' }}>
            Register New Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-content">
          <span className="secure-badge">SECURE CHECKOUT</span>
          <h1>Complete Your Purchase</h1>
          <p>Fast. Secure. Hassle-free.</p>
        </div>
      </div>

      <div className="checkout-main">
        <div className="checkout-left">
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

            {errorMsg && (
              <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '6px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <FaExclamationCircle /> {errorMsg}
              </div>
            )}
            
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

            {paymentMethod === 'card' && (
              <div className="card-form-container">
                <div className="card-form">
                  <div className="input-group full-width">
                    <label>Card Number</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '1px solid #ccc', padding: '0 10px', borderRadius: '6px' }}>
                      <input 
                        type="text" 
                        placeholder="1234 4567 7890 1234" 
                        value={cardDetails.number} 
                        onChange={handleCardNumberChange} 
                        style={{ border: 'none', padding: '12px 0', flex: 1, outline: 'none' }}
                      />
                      {getCardIcon()}
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Card Holder Name</label>
                    <input type="text" placeholder="John Doe" value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} />
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} />
                    </div>
                    <div className="input-group">
                      <label>CVV</label>
                      <input type="password" placeholder={cardType === 'Amex' ? '1234' : '123'} value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>
            )}

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
              <button className="btn-continue" onClick={handleContinue}>
                Continue &rarr;
              </button>
            </div>
          </div>
        </div>

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

            <div className="cart-items">
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <div className="cart-item" key={index}>
                    <img src={item.image || item.img} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f0f0f0' }} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.color || 'Default'}</p>
                      <div className="item-price-row">
                        <span>x {item.qty || 1}</span>
                        <strong>$ {(item.price * (item.qty || 1)).toFixed(2)}</strong>
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