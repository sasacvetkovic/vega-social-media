import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ currentUser }) => {
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
