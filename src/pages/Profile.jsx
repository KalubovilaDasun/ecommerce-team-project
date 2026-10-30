import React, { useState } from 'react';
import './Profile.css';
import { 
  FaUser, FaHeart, FaShoppingBag, FaMapMarkerAlt, FaStar, FaBell, 
  FaShieldAlt, FaCheckCircle, FaEnvelope, FaPhone, FaLock, FaCog, 
  FaQuestionCircle, FaChevronRight, FaTruck, FaUndo, FaHeadset, FaSave,
  FaCamera
} from 'react-icons/fa';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  
  // නම සහ ලිපිනය (Location) තබා ගැනීමට States
  const [userName, setUserName] = useState("John Doe");
  const [userLocation, setUserLocation] = useState("New York, USA");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
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
          
          {/* User Banner */}
          <div className="user-banner">
            <div className="profile-image-container">
              <label htmlFor="profile-upload" className="profile-image-label">
                <img src={profileImage ? profileImage : defaultAvatar} alt="User Avatar" className="user-avatar" />
                <div className="image-overlay">
                  <FaCamera className="camera-icon" />
                </div>
              </label>
              <input 
                type="file" 
                id="profile-upload" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
              />
            </div>
            
            <div className="user-banner-info">
              {/* Dynamic Name සහ Location මෙහි දිස්වේ */}
              <h2>{userName || "User Name"} <FaCheckCircle className="verified-icon" /></h2>
              <p><FaMapMarkerAlt /> {userLocation || "Add Location"}</p>
            </div>
          </div>

          {/* Personal Information Form */}
          <div className="info-card">
            <h3><FaUser className="section-icon" /> Personal Information</h3>
            <div className="form-grid">
              
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    placeholder="Enter your name" 
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input type="email" defaultValue="user@example.com" />
                </div>
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input type="text" defaultValue="(+98) 9123728167" />
                </div>
              </div>
              
              <div className="input-group">
                <label>Location</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  {/* මෙම Input එක මඟින් Banner එකේ Location වෙනස් වේ */}
                  <input 
                    type="text" 
                    value={userLocation} 
                    onChange={(e) => setUserLocation(e.target.value)} 
                    placeholder="e.g. New York, USA" 
                  />
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

          {/* Account Settings */}
          <div className="info-card">
            <h3><FaCog className="section-icon" /> Account Settings</h3>
            <ul className="settings-list">
              <li>
                <div className="setting-item">
                  <FaLock className="setting-icon" />
                  <div>
                    <h4>Change Password</h4>
                    <p>Update your account password</p>
                  </div>
                </div>
                <FaChevronRight className="arrow-icon" />
              </li>
              <li>
                <div className="setting-item">
                  <FaShieldAlt className="setting-icon" />
                  <div>
                    <h4>Privacy Settings</h4>
                    <p>Manage your privacy preferences</p>
                  </div>
                </div>
                <FaChevronRight className="arrow-icon" />
              </li>
              <li>
                <div className="setting-item">
                  <FaQuestionCircle className="setting-icon" />
                  <div>
                    <h4>Help & Support</h4>
                    <p>Get help or contact us</p>
                  </div>
                </div>
                <FaChevronRight className="arrow-icon" />
              </li>
            </ul>
            
            <button className="save-btn"><FaSave /> Save Changes</button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="profile-sidebar-right">
          {/* Recent Orders */}
          <div className="right-card">
            <div className="card-header">
              <h3><FaShoppingBag className="section-icon" /> Recent Orders</h3>
              <a href="#" className="view-all">View All &rarr;</a>
            </div>
            
            <div className="order-list">
              <div className="order-item">
                <div className="order-img-box"><img src="https://via.placeholder.com/60" alt="Product" /></div>
                <div className="order-info">
                  <h4>PRO X Gaming Headset</h4>
                  <p>12 Oct 2024</p>
                  <span className="status delivered">Delivered</span>
                </div>
                <div className="order-price">$399.00 <FaChevronRight className="arrow-icon" /></div>
              </div>
              <div className="order-item">
                <div className="order-img-box"><img src="https://via.placeholder.com/60" alt="Product" /></div>
                <div className="order-info">
                  <h4>Active Watch 2</h4>
                  <p>05 Oct 2024</p>
                  <span className="status shipped">Shipped</span>
                </div>
                <div className="order-price">$149.00 <FaChevronRight className="arrow-icon" /></div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="right-card quick-links-card">
            <h3><FaCheckCircle className="section-icon" style={{color: '#0066ff'}}/> Quick Links</h3>
            <ul className="quick-links">
              <li><FaTruck className="ql-icon"/> Track Your Order <FaChevronRight className="arrow-icon" /></li>
              <li><FaUndo className="ql-icon"/> Return & Refunds <FaChevronRight className="arrow-icon" /></li>
              <li><FaQuestionCircle className="ql-icon"/> FAQ <FaChevronRight className="arrow-icon" /></li>
              <li><FaHeadset className="ql-icon"/> Contact Support <FaChevronRight className="arrow-icon" /></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;