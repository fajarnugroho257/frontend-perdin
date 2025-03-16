import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const PublicRoute = () => {
  const role = localStorage.getItem("role");
  const auth = useContext(AuthContext);
  return auth?.token && role === 'sdm' ?  <Navigate to="/admin" />  : auth?.token && role === 'pegawai' ?  <Navigate to="/pegawai" /> : <Outlet />;
};

export default PublicRoute;

