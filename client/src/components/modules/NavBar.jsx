import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PopupProfile from "./PopupProfile";
import "./NavBar.css";

const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  // use a ref to store the timeout
  const hoverTimeoutRef = useRef(null);

  // mouse enter, clear the timeout to keep the popup
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  // mouse leave, set a timeout to hide the popup
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  return (
    <>
      <div className="NavBar-placeholder"></div>
      <nav className="NavBar-container">
        <div className="NavBar-content">
          <div>
            <Link to="/market" className="NavBar-title u-inlineBlock">
              GradGoods
            </Link>
          </div>
          <div
            className="NavBar-profile-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="NavBar-profile u-inlineBlock">
              <Link to="/cart" className="NavBar-link">
                PROFILE
              </Link>
            </div>
            <PopupProfile isHovered={isHovered} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
