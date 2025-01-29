import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar";
import { Outlet } from "react-router-dom";
import { UserContext } from "./context/UserContext";

import "../utilities.css";

import { get, post } from "../utilities";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    post("/api/logout").then(() => {
      setUserId(null);
    });
  };

  return (
    <UserContext.Provider value={userId}>
      <NavBar handleLogout={handleLogout} />
      <div className="App-container">
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default App;
