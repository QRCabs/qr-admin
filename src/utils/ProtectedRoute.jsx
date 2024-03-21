import { Navigate } from "react-router-dom";
import { getUserFromStore } from "./helper";

const ProtectedRoute = ({ children }) => {
  const user = getUserFromStore();

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
