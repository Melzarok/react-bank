import { useAuth } from "../contexts/AuthContext"; //
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/balance" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
