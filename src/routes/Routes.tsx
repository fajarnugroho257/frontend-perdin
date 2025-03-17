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
import User from "../pages/admin/User";
import UserEdit from "../pages/admin/UsersEdit";
import PersetujuanStatus from "../pages/admin/PersetujuanStatus";
import Register from "../pages/Register";
import Pulau from "../pages/admin/Pulau";
import PulauTambah from "../pages/admin/PulauTambah";
import PulauEdit from "../pages/admin/PulauEdit";
import Provinsi from "../pages/admin/Provinsi";
import ProvinsiTambah from "../pages/admin/ProvinsiTambah";
import ProvinsiEdit from "../pages/admin/ProvinsiEdit";
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
            <Route path="edit/:perdin_id" element={<PersetujuanStatus />} />
          </Route>
          <Route path="/user" element={<DashboardLayout />}>
            <Route index element={<User />} />
            <Route path="tambah" element={<PerdinTambah />} />
            <Route path="edit/:user_id" element={<UserEdit />} />
          </Route>
          <Route path="/provinsi" element={<DashboardLayout />}>
            <Route index element={<Provinsi />} />
            <Route path="tambah" element={<ProvinsiTambah />} />
            <Route path="edit/:prov_id" element={<ProvinsiEdit />} />
          </Route>
          <Route path="/pulau" element={<DashboardLayout />}>
            <Route index element={<Pulau />} />
            <Route path="tambah" element={<PulauTambah />} />
            <Route path="edit/:pulau_id" element={<PulauEdit />} />
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
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Redirect jika halaman tidak ditemukan */}
        
      </Routes>
    );
};

export default AppRoutes;
