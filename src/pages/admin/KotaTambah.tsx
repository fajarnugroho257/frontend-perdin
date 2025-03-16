/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Link } from "react-router-dom";
import { Save, ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { MenuItem, Select} from "@mui/material";
import { storeKota, getAllPulau, getAllProvinsi } from "../../api/auth";
import Swal from "sweetalert2";


const KotaTambah = () => {
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
    // provinsi
    interface data_provinsi {
        prov_id: string;
        prov_nama: string;
    }
    const [dataProvinsi, setDataProvinsi] = useState<data_provinsi[]>([]);
    const allProvinsi = async (pulau_id:string) => {
        const response = await getAllProvinsi(pulau_id);
        setDataProvinsi(response.data);
    }
    // 
    useEffect(() => {
        allPulau();
    }, []);
    // data
    const noData = {
        kota_nama: "",
        kota_latitude: "",
        kota_longitude: "",
        prov_id: "",
        pulau_id: "",
        kota_st: "",
    }
    const [formData, setFormData] = useState(noData)
    // input onchange
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        // jika pulau berubah
        if (name === 'pulau_id') {
            // fungsi get prov by pulau
            allProvinsi(value);
        }
        setFormData((prevData) => ({
            ...prevData, [name]:value,
        }));
    }
    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // store
        try {
            const response = await storeKota(formData);
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
                            <h5>Tambah Data Kota</h5>
                            <Button variant="contained" size="small" startIcon={<ArrowBack />} component={Link} to="/kota">
                                Kembali
                            </Button>
                        </div>
                        <hr className="mb-3" />
                        <div>
                            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
                                <TextField
                                required
                                label="Nama Kota"
                                type="text"
                                size="small"
                                name="kota_nama"
                                value={formData.kota_nama}
                                onChange={handleOnChange}
                                />
                                <TextField
                                required
                                label="Latitude"
                                type="text"
                                size="small"
                                name="kota_latitude"
                                value={formData.kota_latitude}
                                onChange={handleOnChange}
                                />
                                <TextField
                                required
                                label="Longitude"
                                type="text"
                                size="small"
                                name="kota_longitude"
                                value={formData.kota_longitude}
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
                                <Select name="prov_id" value={formData.prov_id} onChange={handleOnChange} required size="small">
                                    <MenuItem value="" disabled>
                                    Pilih salah satu...
                                    </MenuItem>
                                    {dataProvinsi && dataProvinsi.map((val, index) => {
                                        return <MenuItem key={index+val.prov_nama}  value={val.prov_id}>{val.prov_nama}</MenuItem>;
                                    })}
                                </Select>
                                <Select name="kota_st" value={formData.kota_st} onChange={handleOnChange} required size="small">
                                    <MenuItem value="" disabled>
                                    Pilih salah satu...
                                    </MenuItem>
                                    <MenuItem value="yes">Dalam Negeri</MenuItem>
                                    <MenuItem value="no">Luar Negeri</MenuItem>
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

export default KotaTambah;