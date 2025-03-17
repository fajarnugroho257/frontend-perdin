/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Link, Navigate, useParams, useNavigate  } from "react-router-dom";
import { Save, ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { MenuItem, Select} from "@mui/material";
import { detailDataUser, updateDataUser } from "../../api/auth";
import Swal from "sweetalert2";


const UserEdit = () => {
    const navigate = useNavigate();
    const { user_id } = useParams();

    const noData = {
        username: "",
        password: "",
        nama: "",
        role: "",
    }
    // 
    const [formData, setFormData] = useState(noData);
    // 
    useEffect(() => {
        const getDetailData = async () => {
            try {
                const response = await detailDataUser(user_id ?? '0');
                if (response.success) {
                    setFormData(response.data);
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.message,
                        icon: "error",
                        confirmButtonText: "OK",
                        width: "400px",
                        heightAuto:true
                    });
                    navigate('/user');
                }
            } catch (error) {
                console.error("Gagal mengambil data user:", error);
            }
        }
        getDetailData();
    }, []);
    
    // input onchange
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]:value,
        }));
    }
    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // update
        try {
            const response = await updateDataUser(formData, user_id ?? '0');
            if (response.success) {
                Swal.fire({
                    title: "Succes!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                    width: "400px",
                    heightAuto:true
                });
            }
        } catch (error) {
            console.error("Gagal update data kota:", error);
        }
        console.log(formData);
    }
    return (
    <>
        <div className="h-screen  w-full">
            <div className={`flex flex-col bg-gray-100 h-screen`}>
                <Header/>
                <div className="m-5 p-5 bg-white flex-1 overflow-y-auto scrollbar-hide rounded-md shadow-md">
                    <div className="w-full">
                        <div className="flex justify-between mb-2">
                            <h5>Ubah Data User</h5>
                            <Button variant="contained" size="small" startIcon={<ArrowBack />} component={Link} to="/user">
                                Kembali
                            </Button>
                        </div>
                        <hr className="mb-3" />
                        <div>
                            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
                                <TextField
                                required
                                label="Nama user"
                                type="text"
                                size="small"
                                name="nama"
                                value={formData.nama}
                                onChange={handleOnChange}
                                />
                                <TextField
                                required
                                label="Username"
                                type="text"
                                size="small"
                                name="username"
                                value={formData.username}
                                onChange={handleOnChange}
                                />
                                <TextField
                                label="Kosongi jika tidak ingin merubah password"
                                type="password"
                                size="small"
                                name="password"
                                // value={formData.password}
                                onChange={handleOnChange}
                                className="w-full"
                                />
                                <Select name="role" value={formData.role} onChange={handleOnChange} required size="small">
                                    <MenuItem value="" disabled>
                                    Pilih salah satu...
                                    </MenuItem>
                                    <MenuItem value="sdm">SDM</MenuItem>
                                    <MenuItem value="pegawai">PEGAWAI</MenuItem>
                                </Select>
                                <div className="w-5">
                                    <Button type="submit" size="small" variant="contained" color="success" startIcon={<Save />}>Simpan</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default UserEdit;