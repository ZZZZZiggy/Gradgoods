import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../context/UserContext";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google login success:", credentialResponse);
      await handleLogin(credentialResponse);
      navigate("/market");
    } catch (error) {
      console.error("Login handling failed:", error);
    }
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
          {userId ? (
            <button
              className="custom-login-button"
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
            >
              Sign out
            </button>
          ) : (
            <GoogleLogin
              text="signin_with"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              flow="implicit"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
