import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isConfirm } = useContext(AuthContext);

  console.log("Confirm", isConfirm);

  return children;
};

export default PrivateRoute;
