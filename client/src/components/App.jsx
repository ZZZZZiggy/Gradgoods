import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./modules/NavBar";
import { Outlet } from "react-router-dom";
import { UserContext } from "./context/UserContext";

import "../utilities.css";

import { get, post } from "../utilities";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    get("/api/whoami")
      .then((user) => {
        if (user._id) {
          setUserId(user._id);
        } else if (location.pathname !== "/") {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate, location.pathname]);

  const handleLogin = (credentialResponse) => {
    return new Promise((resolve, reject) => {
      const userToken = credentialResponse.credential;
      post("/api/login", { token: userToken })
        .then((user) => {
          setUserId(user._id);
          resolve(user);
        })
        .catch((err) => {
          console.error("Login API error:", err);
          reject(err);
        });
    });
  };

  const handleLogout = () => {
    post("/api/logout").then(() => {
      setUserId(null);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ userId, handleLogin, handleLogout }}>
      <NavBar handleLogout={handleLogout} />
      <div className="App-container">
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default App;
