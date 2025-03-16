import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const PrivateRouteAdmin = () => {
  const role = localStorage.getItem("role");
  const auth = useContext(AuthContext);
  return auth?.token && role === 'sdm' ? <Outlet /> : <Navigate to="/login" />;
};

export const PrivateRoutePegawai = () => {
  const role = localStorage.getItem("role");
  const auth = useContext(AuthContext);
  return auth?.token && role === 'pegawai' ? <Outlet /> : <Navigate to="/login" />;
};

