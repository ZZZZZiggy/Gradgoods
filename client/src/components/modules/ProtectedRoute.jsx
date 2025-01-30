import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userId } = useContext(UserContext);

  if (!userId) {
    // 未登录时重定向到首页
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
