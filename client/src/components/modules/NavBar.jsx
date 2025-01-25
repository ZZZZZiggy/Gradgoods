import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  // 用一个ref来存定时器，避免每次渲染都丢失
  const hoverTimeoutRef = useRef(null);

  // 鼠标移入时：清除定时器并显示弹框
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  // 鼠标移出时：设置一个延迟关闭弹框的定时器
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100); // 这里可以根据需要调整延迟时间
  };

  return (
    <nav className="NavBar-container">
      <div className="NavBar-content">
        <div>
          <Link to="/" className="NavBar-title u-inlineBlock">
            GradGoods
          </Link>
        </div>
        <div
          className="NavBar-profile-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="NavBar-profile u-inlineBlock">
            <Link to="/profile" className="NavBar-link">
              PROFILE
            </Link>
          </div>

          <div className={`NavBar-popup ${isHovered ? "show" : ""}`}>
            <div className="popup-item">
              <Link to="/profile">My Profile</Link>
            </div>
            <div className="popup-item">
              <Link to="/settings">Settings</Link>
            </div>
            <div className="popup-item">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
