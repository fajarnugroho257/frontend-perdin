import { Routes, Route, Navigate } from "react-router-dom";
import {PrivateRouteAdmin, PrivateRoutePegawai} from "./PrivateRoute"; // Pastikan path sudah benar
import Dashboard from "../pages/Dashboard";
import Perdin from "../pages/pegawai/Perdin";
import PerdinTambah from "../pages/pegawai/PerdinTambah";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Persetujuan from "../pages/admin/Persetujuan";
import Kota from "../pages/admin/Kota";
import KotaTambah from "../pages/admin/KotaTambah";
import KotaEdit from "../pages/admin/KotaEdit";
import PerdinEdit from "../pages/pegawai/PerdinEdit";
// https://bit.ly/Technicaltest-PRG-Yogya
const AppRoutes = () => {
  const role = localStorage.getItem("role");
    return (
      <Routes>
        {/* PrivateRouteAdmin */}
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/kota" element={<DashboardLayout />}>
            <Route index element={<Kota />} />
            <Route path="tambah" element={<KotaTambah />} />
            <Route path="edit/:id" element={<KotaEdit />} />
          </Route>
          <Route path="/persetujuan" element={<DashboardLayout />}>
            <Route index element={<Persetujuan />} />
            <Route path="tambah" element={<PerdinTambah />} />
          </Route>
          
        </Route>

        {/* PrivateRoutePegawai */}
        <Route element={<PrivateRoutePegawai />}>
          <Route path="/pegawai" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/perdin" element={<DashboardLayout />}>
            <Route index element={<Perdin />} />
            <Route path="tambah" element={<PerdinTambah />} />
            <Route path="edit/:perdinID" element={<PerdinEdit />} />
          </Route>
        </Route>
        {role && role === 'sdm' ? <Route path="*" element={<Navigate to="/admin" />} /> : <Route path="*" element={<Navigate to="/pegawai" />} /> }
        {/* Group untuk halaman yang bebas diakses */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Redirect jika halaman tidak ditemukan */}
        
      </Routes>
    );
};

export default AppRoutes;
