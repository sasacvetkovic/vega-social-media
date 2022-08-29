import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({currentUser}) => {
  return true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
