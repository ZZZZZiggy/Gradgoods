import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { get, post } from "../../utilities";
import "./NavBar.css";

import { UserContext } from "../context/UserContext";

// NavBar is a React component that renders the navigation bar at the top of all pages

const NavBar = (props) => {
  const user = useContext(UserContext);
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">GradGoods</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/market" className="NavBar-link">
          Market
        </Link>
        {/* {user ? (
          <>
            <Link to="/user" className="NavBar-link">
              Profile
            </Link>
            <Link to="/logout" className="NavBar-link">
              Logout
            </Link>
          </>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={(res) => {
              post("/api/login", { token: res.tokenId }).then((user) => {
                setUser(user);
              });
            }}
            onFailure={(err) => {
              console.log(err);
            }}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Login with Google
              </button>
            )}
          />
        )} */}
      </div>
      <div className="NavBar-profile u-inlineBlock">
        <Link to="/profile" className="NavBar-link">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
