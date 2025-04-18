import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

/**
 * Защищённый route
 * @param {JSX.Element} children — страница, которую хотим отрисовать
 * @param {string}   requiredRole — минимальная роль: 'user' или 'root'
 */

function ProtectedRoute({ children, requiredRole = "user" }) {
  const user = getUser();

  if (!user) {
    console.log("User in not logged in");
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "root" && user.role !== "root") {
    console.log("User in not root");
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default ProtectedRoute;
