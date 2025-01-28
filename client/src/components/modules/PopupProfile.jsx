import React from "react";
import { Link } from "react-router-dom";
import "./PopupProfile.css";

const PopupProfile = ({ isHovered }) => {
  return (
    <div className={`NavBar-popup ${isHovered ? "show" : ""}`}>
      {/* avatar */}
      <div className="popup-avatar">
        <Link to="/profile">
          <img src="/1.jpg" alt="Avatar" />
          {/* will be replaced with user's avatar */}
        </Link>
      </div>

      {/* middle area */}
      <div className="popup-items-center">
        {/* <div className="popup-item">
          <Link to="/orders">Orders</Link>
        </div> */}
        <div className="popup-item">
          <Link to="/cart">Cart</Link>
        </div>
        <div className="popup-item">
          <Link to="/sell">Sell</Link>
        </div>
      </div>

      {/* Logout, Verification */}
      <div className="popup-bottom">
        <div className="popup-bottom-item">
          <Link to="/home">Logout</Link>
        </div>
        <div className="popup-bottom-item">
          <Link to="/verification">Verification</Link>
        </div>
      </div>
    </div>
  );
};

export default PopupProfile;
