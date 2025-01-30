import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../context/UserContext";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    handleLogin(credentialResponse);
    navigate("/market");
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  return (
    <div className="home-wrapper">
      <img src="/homepage.jpg" alt="Homepage" className="home-image" />
      <div className="text-overlay">
        <h1>Welcome to GradGoods</h1>
        <p>Your university marketplace for second-hand treasures</p>
        <div className="login-button-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            flow="implicit"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
