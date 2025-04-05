import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isConfirm } = useContext(AuthContext);

  console.log("auth", isAuthenticated);
  console.log("Confirm", isConfirm);

  if (isAuthenticated) {
    console.log("isAuthenticated подтвержден", isAuthenticated);
  }

  return children;
};

export default PrivateRoute;
