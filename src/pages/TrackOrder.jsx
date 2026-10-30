import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaShippingFast, FaHome } from 'react-icons/fa';
import './OrderTheme.css';

const TrackOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="theme-page-container">
      <div className="theme-content-box track-box">
        <h1 className="theme-title">Track Your Order</h1>
        <p className="theme-subtitle">Order ID: #GZ-849201</p>

        <div className="tracking-steps">
          <div className="track-step completed">
            <div className="track-icon"><FaBoxOpen /></div>
            <p>Processing</p>
          </div>
          <div className="track-line"></div>
          <div className="track-step active">
            <div className="track-icon"><FaShippingFast /></div>
            <p>Shipped</p>
          </div>
          <div className="track-line pending"></div>
          <div className="track-step">
            <div className="track-icon"><FaHome /></div>
            <p>Delivered</p>
          </div>
        </div>

        <button className="btn-theme-outline" onClick={() => navigate('/')}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default TrackOrder;