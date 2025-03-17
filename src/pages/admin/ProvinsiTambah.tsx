/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Link } from "react-router-dom";
import { Save, ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { MenuItem, Select} from "@mui/material";
import { storeProvinsi, getAllPulau } from "../../api/auth";
import Swal from "sweetalert2";


const ProvinsiTambah = () => {
    // pulau
    interface data_pulau {
        pulau_id: string;
        pulau_nama: string;
    }
    const [dataPulau, setDataPulau] = useState<data_pulau[]>([]);
    const allPulau = async () => {
        const response = await getAllPulau();
        setDataPulau(response.data);
    }
    useEffect(() => {
        allPulau();
    }, []);
    // data
    const noData = {
        pulau_id: "",
        prov_nama: "",
    }
    const [formData, setFormData] = useState(noData);
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
        console.log(formData);
        try {
            const response = await storeProvinsi(formData);
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
            setFormData(noData);
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
                            <h5>Tambah Data Provinsi</h5>
                            <Button variant="contained" size="small" startIcon={<ArrowBack />} component={Link} to="/provinsi">
                                Kembali
                            </Button>
                        </div>
                        <hr className="mb-3" />
                        <div>
                            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
                                <TextField
                                required
                                label="Nama Provinsi"
                                type="text"
                                size="small"
                                name="prov_nama"
                                value={formData.prov_nama}
                                onChange={handleOnChange}
                                />
                                <Select name="pulau_id" value={formData.pulau_id} onChange={handleOnChange} required size="small">
                                    <MenuItem value="" disabled>
                                    Pilih salah satu...
                                    </MenuItem>
                                    {dataPulau && dataPulau.map((val, index) => {
                                        return <MenuItem key={index+val.pulau_nama} value={val.pulau_id}>{val.pulau_nama}</MenuItem>;
                                    })}
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

export default ProvinsiTambah;