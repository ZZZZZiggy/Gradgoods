import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <img src="/homepage.jpg" alt="Homepage" className="home-image" />
      <div className="text-overlay">
        <h1>Welcome to GradeGoods</h1>
        <p>Your university marketplace for second-hand treasures</p>
        <button className="explore-button" onClick={() => navigate("/market")}>
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default Home;
