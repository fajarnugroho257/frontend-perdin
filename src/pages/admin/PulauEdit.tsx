/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Save, ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { MenuItem, Select} from "@mui/material";
import { detailPulau, updatePulau } from "../../api/auth";
import Swal from "sweetalert2";


const PulauEdit = () => {
    const { pulau_id } = useParams();
    const navigate = useNavigate();
    // data
    const noData = {
        pulau_nama: "",
    }
    const [formData, setFormData] = useState(noData)
    useEffect(() => {
        const getDetailData = async () => {
            try {
                const response = await detailPulau(pulau_id ?? '');
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
                    navigate('/kota');
                }
            } catch (error) {
                console.error("Gagal mengambil data kota:", error);
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
        // store
        try {
            const response = await updatePulau(formData, pulau_id ?? "");
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
            if (error instanceof Error) {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "OK",
                    width: "400px",
                    heightAuto:true
                });
            }
        }
    }
    return (
    <>
        <div className="h-screen  w-full">
            <div className={`flex flex-col bg-gray-100 h-screen`}>
                <Header/>
                <div className="m-5 p-5 bg-white flex-1 overflow-y-auto scrollbar-hide rounded-md shadow-md">
                    <div className="w-full">
                        <div className="flex justify-between mb-2">
                            <h5>Edit Data Pulau</h5>
                            <Button variant="contained" size="small" startIcon={<ArrowBack />} component={Link} to="/pulau">
                                Kembali
                            </Button>
                        </div>
                        <hr className="mb-3" />
                        <div>
                            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
                                <TextField
                                required
                                label="Nama Pulau"
                                type="text"
                                size="small"
                                name="pulau_nama"
                                value={formData.pulau_nama}
                                onChange={handleOnChange}
                                />
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

export default PulauEdit;