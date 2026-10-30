import React, { useState } from 'react';
import './Profile.css';
import emailjs from '@emailjs/browser';
import { 
  FaUser, FaHeart, FaShoppingBag, FaMapMarkerAlt, FaStar, FaBell, 
  FaShieldAlt, FaCheckCircle, FaEnvelope, FaPhone, FaLock, FaCog, 
  FaQuestionCircle, FaChevronRight, FaSave, FaCamera
} from 'react-icons/fa';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState("dasun");
  const [userLocation, setUserLocation] = useState("sri lanka");
  
  // Real Email OTP States
  const [emailAddress, setEmailAddress] = useState("user@example.com");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
    setIsEmailVerified(false);
    setShowOtpField(false);
  };

  // 1. සැබෑ OTP එකක් Generate කර EmailJS හරහා ඊමේල් එකට යැවීම
  const handleSendEmailOtp = () => {
    if (!emailAddress.includes("@") || !emailAddress.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    // අහඹු 6-digit කේතයක් සකස් කිරීම
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);

    const templateParams = {
      email: emailAddress,      // Template එකේ To Email {{email}} සඳහා
      passcode: randomOtp,      // Template එකේ {{passcode}} සඳහා
      time: "15 minutes"        // Template එකේ {{time}} සඳහා
    };

    // මෙහි ඔබගේ සැබෑ Service ID, Template ID සහ Public Key දමන්න
    emailjs.send('service_gkliczw', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(`OTP code successfully sent to ${emailAddress}! Check your inbox.`);
        setShowOtpField(true);
      }, (err) => {
        console.log('FAILED...', err);
        alert("Failed to send email. Please check your EmailJS configuration.");
      });
  };

  // 2. පරිශීලකයා ඇතුළත් කළ කේතය පරීක්ෂා කිරීම
  const handleVerifyEmailOtp = () => {
    if (otpValue === generatedOtp) {
      setIsEmailVerified(true);
      setShowOtpField(false);
      setOtpValue("");
      alert("Email verified successfully!");
    } else {
      alert("Invalid verification code! Please check the code sent to your email.");
    }
  };

  const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  return (
    <div className="profile-page">
      <div className="profile-header-section">
        <div className="header-content-wrapper">
          <span className="profile-breadcrumb">MY ACCOUNT</span>
          <h1>Your Profile</h1>
          <p>Manage your information, orders and more.</p>
        </div>
      </div>

      <div className="profile-main-container">
        
        {/* Left Sidebar */}
        <div className="profile-sidebar-left">
          <ul className="sidebar-menu">
            <li className="active"><FaUser className="menu-icon" /> User Info <FaChevronRight className="arrow-icon" /></li>
            <li><FaHeart className="menu-icon" /> Favorites</li>
            <li><FaShoppingBag className="menu-icon" /> Orders</li>
            <li><FaMapMarkerAlt className="menu-icon" /> Addresses</li>
            <li><FaStar className="menu-icon" /> Reviews</li>
            <li><FaBell className="menu-icon" /> Notifications</li>
          </ul>

          <div className="security-badge">
            <FaShieldAlt className="shield-icon" />
            <div>
              <strong>Your account is safe</strong>
              <p>We use industry-standard encryption to protect your data.</p>
            </div>
          </div>
        </div>

        {/* Center Main Content */}
        <div className="profile-content-center">
          
          <div className="user-banner">
            <div className="profile-image-container">
              <label htmlFor="profile-upload" className="profile-image-label">
                <img src={profileImage || defaultAvatar} alt="User Avatar" className="user-avatar" />
                <div className="image-overlay"><FaCamera className="camera-icon" /></div>
              </label>
              <input type="file" id="profile-upload" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            
            <div className="user-banner-info">
              <h2>{userName || "User Name"} <FaCheckCircle className="verified-icon" /></h2>
              <p><FaMapMarkerAlt /> {userLocation || "Add Location"}</p>
            </div>
          </div>

          <div className="info-card">
            <h3><FaUser className="section-icon" /> Personal Information</h3>
            <div className="form-grid">
              
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
              </div>

              {/* Real Email Verification Section */}
              <div className="input-group" style={{ gridColumn: showOtpField ? '1 / -1' : 'auto' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Email Address 
                  {isEmailVerified && <FaCheckCircle style={{ color: '#28a745', fontSize: '14px' }} title="Verified" />}
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div className="input-with-icon" style={{ flex: 1 }}>
                    <FaEnvelope className="input-icon" />
                    <input 
                      type="email" 
                      value={emailAddress} 
                      onChange={handleEmailChange} 
                      style={{ border: isEmailVerified ? '1px solid #28a745' : '1px solid #e0e0e0', outline: 'none' }}
                      placeholder="user@example.com"
                    />
                  </div>
                  {!isEmailVerified && !showOtpField && (
                    <button type="button" onClick={handleSendEmailOtp} style={{ padding: '0 20px', background: '#0066ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                      Verify
                    </button>
                  )}
                </div>
                
                {showOtpField && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px', padding: '15px', background: '#f8f9fa', border: '1px dashed #ccc', borderRadius: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Enter OTP from your email" 
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      style={{ flex: '1', padding: '10px 15px', border: '1px solid #ccc', borderRadius: '6px', outline: 'none' }}
                    />
                    <button type="button" onClick={handleVerifyEmailOtp} style={{ padding: '0 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                      Confirm OTP
                    </button>
                  </div>
                )}
              </div>
              
              <div className="input-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input type="text" defaultValue="+94719776739" />
                </div>
              </div>
              
              <div className="input-group">
                <label>Location</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <input type="text" value={userLocation} onChange={(e) => setUserLocation(e.target.value)} />
                </div>
              </div>
              
              <div className="input-group">
                <label>Postal Code</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <input type="text" defaultValue="23728167" />
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3><FaCog className="section-icon" /> Account Settings</h3>
            <ul className="settings-list">
              <li>
                <div className="setting-item">
                  <FaLock className="setting-icon" />
                  <div><h4>Change Password</h4><p>Update your account password</p></div>
                </div>
                <FaChevronRight className="arrow-icon" />
              </li>
              <li>
                <div className="setting-item">
                  <FaShieldAlt className="setting-icon" />
                  <div><h4>Privacy Settings</h4><p>Manage your privacy preferences</p></div>
                </div>
                <FaChevronRight className="arrow-icon" />
              </li>
              <li>
                <div className="setting-item">
                  <FaQuestionCircle className="setting-icon" />
                  <div><h4>Help & Support</h4><p>Get help or contact us</p></div>
                </div>
                <FaChevronRight className="arrow-icon" />
              </li>
            </ul>
            <button className="save-btn"><FaSave /> Save Changes</button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="profile-sidebar-right">
          <div className="right-card">
            <div className="card-header">
              <h3><FaShoppingBag className="section-icon" /> Recent Orders</h3>
              <a href="#" className="view-all">View All &rarr;</a>
            </div>
            <div className="order-list">
              <div className="order-item">
                <div className="order-img-box"><img src="https://via.placeholder.com/60" alt="Product" /></div>
                <div className="order-info">
                  <h4>PRO X Gaming Headset</h4><p>12 Oct 2024</p><span className="status delivered">Delivered</span>
                </div>
                <div className="order-price">$399.00 <FaChevronRight className="arrow-icon" /></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;