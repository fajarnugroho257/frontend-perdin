/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Link, Navigate, useParams, useNavigate  } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import getDistanceBetweenPoints from "../../util/HitungJarak";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { detailDataPerdin, getAllPref, updateStatus } from "../../api/auth";
import Swal from "sweetalert2";

const CurrentDate = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).split("/").reverse().join("-");
    return formattedDate;
};

const calculateDateDifference = (date1: string, date2: string) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
  
    // Konversi milidetik ke hari (1 hari = 1000ms * 60s * 60m * 24h)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
    return diffDays;
};

// format rupiah
const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
};

const PersetujuanStatus = () => {
    const navigate = useNavigate();
    const { perdin_id } = useParams();
    const [tempuh, setTempuh] = useState(0);
    const [perdinKeterangan, setPerdinKeterangan] = useState("");
    const [perdinValue, setPerdinValue] = useState("");
    // preference
        interface data_preference {
            pref_id: string;
            pref_name: string;
            pref_value: string;
            pref_ket: string;
        }
        const [dataPreference, setDataPreference] = useState<data_preference[]>([]);
    const noData = {
        perdin_id: "",
        perdin_maksud: "",
        pref_id: "",
        perdin_start: CurrentDate(),
        perdin_end: CurrentDate(),
        perdin_asal: "",
        perdin_tujuan: "",
        perdin_durasi: "1",
        perdin_biaya: "",
        perdin_st: "waiting",
        perdin_asal_latitude: "",
        perdin_asal_longitude: "",
        perdin_asal_prov: "",
        perdin_asal_pulau: "",
        perdin_asal_dalam: "yes",
        perdin_tujuan_latitude: "",
        perdin_tujuan_longitude: "",
        perdin_tujuan_prov: "",
        perdin_tujuan_pulau: "",
        perdin_tujuan_dalam: "yes",
        perdin_saku: "no"
    }
    // 
    const [formData, setFormData] = useState(noData);
    // 
    useEffect(() => {
        const getDetailData = async () => {
            try {
                const response = await detailDataPerdin(perdin_id ?? '0');
                if (response.success) {
                    const aturData = {
                        perdin_id: response.data.perdin_id,
                        perdin_maksud: response.data.perdin_maksud,
                        pref_id: response.data.pref_id,
                        perdin_start: response.data.perdin_start,
                        perdin_end: response.data.perdin_end,
                        perdin_asal: response.data.asal.kota_nama,
                        perdin_tujuan: response.data.tujuan.kota_nama,
                        perdin_durasi: response.data.perdin_durasi,
                        perdin_biaya: response.data.perdin_biaya,
                        perdin_st: response.data.perdin_st,
                        perdin_asal_latitude: response.data.asal.kota_latitude,
                        perdin_asal_longitude: response.data.asal.kota_longitude,
                        perdin_asal_prov: response.data.asal.prov_id,
                        perdin_asal_pulau: response.data.asal.pulau_id,
                        perdin_asal_dalam: response.data.asal.kota_st,
                        perdin_tujuan_latitude: response.data.tujuan.kota_latitude,
                        perdin_tujuan_longitude: response.data.tujuan.kota_longitude,
                        perdin_tujuan_prov: response.data.tujuan.prov_id,
                        perdin_tujuan_pulau: response.data.tujuan.pulau_id,
                        perdin_tujuan_dalam: response.data.tujuan.kota_st,
                        perdin_saku: response.data.perdin_saku,
                    }
                    const resPref = await getAllPref();
                    if (resPref.success) {
                        const resPrefVal = resPref.data;
                        setDataPreference(resPrefVal);
                        const listPref = resPrefVal.filter((val:any) => val.pref_id === aturData['pref_id']);
                        setPerdinKeterangan(listPref[0]['pref_ket']);
                        setPerdinValue(listPref[0]['pref_value']);
                        const jarakTempuh = getDistanceBetweenPoints(aturData['perdin_asal_latitude'], aturData['perdin_asal_longitude'],aturData['perdin_tujuan_latitude'],aturData['perdin_tujuan_longitude']);
                        setTempuh(jarakTempuh);
                        setFormData(aturData);
                    }
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
    const biaya = parseInt(perdinValue) * parseInt(formData.perdin_durasi);

    // update persetujuan
        const handleUpdateStatus = async (perdin_id:string, status:string) => {
            const response = await updateStatus(perdin_id, status);
            if (!response.success) {
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "OK",
                    width: "400px",
                    heightAuto:true
                });
            } else {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                    width: "400px",
                    heightAuto:true
                });
            }
        }
    // 
    const handleUpdate = async (perdin_id:string, status:string) => {
            const arti = status === 'approve' ? "menyetujui" : "menolak";
            try {
                Swal.fire({
                    title: "Apakah Anda yakin?",
                    text: `Akan ${arti} data ini!`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Ya...!",
                    cancelButtonText: "Batal",
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleUpdateStatus(perdin_id, status);
                    }
                });
            } catch (error) {
                console.error("Gagal menyetujui data perdin:", error);
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
                            <h5>Approval Perdin</h5>
                            <Button variant="contained" size="small" startIcon={<ArrowBack />} component={Link} to="/persetujuan">
                                Kembali
                            </Button>
                        </div>
                        <hr className="mb-3" />
                        <div className="grid gap-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <TextField
                                required
                                aria-hidden
                                label="Tanggal Mulai"
                                type="date"
                                size="small"
                                name="perdin_start"
                                value={formData.perdin_start}
                                InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                required
                                aria-hidden
                                label="Tanggal Selesai"
                                type="date"
                                size="small"
                                name="perdin_end"
                                value={formData.perdin_end}
                                InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                required
                                aria-hidden
                                label="Durasi"
                                aria-readonly
                                type="text"
                                size="small"
                                name="perdin_durasi"
                                value={formData.perdin_durasi}
                                InputProps={{
                                    readOnly: true,
                                  }}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <TextField
                                required
                                aria-hidden
                                label="Kota Asal"
                                aria-readonly
                                type="text"
                                size="small"
                                name="perdin_asal"
                                value={formData.perdin_asal}
                                InputProps={{
                                    readOnly: true,
                                  }}
                                />
                                <TextField
                                required
                                aria-hidden
                                label="Kota Tujuan"
                                aria-readonly
                                type="text"
                                size="small"
                                name="perdin_tujuan"
                                value={formData.perdin_tujuan}
                                InputProps={{
                                    readOnly: true,
                                  }}
                                />
                            </div>
                            <TextField
                                required
                                aria-hidden
                                label="Tujuan"
                                multiline
                                rows={2}
                                fullWidth
                                variant="outlined"
                                name="perdin_maksud"
                                value={formData.perdin_maksud}
                                InputProps={{
                                    readOnly: true,
                                }}
                                />
                            {/* <div className="w-5">
                                <Button type="submit" size="small" variant="contained" color="success" startIcon={<Save />}>Simpan</Button>
                            </div> */}
                        </div>
                        {formData.perdin_asal !== '' && formData.perdin_tujuan !== '' ? 
                            <div className="rounded-md mt-5">
                                <div className="grid md:grid-cols-3 bg-blue-300 py-3">
                                    <div className="text-center">Total Hari</div>
                                    <div className="text-center">Jarak Tempuh</div>
                                    <div className="text-center">Total Uang Perdin</div>
                                </div>
                                <div className="grid md:grid-cols-3 bg-gray-300 py-3">
                                    <div className="text-center">{formData.perdin_durasi}</div>
                                    <div className="text-center">{tempuh} KM</div>
                                    <div className="text-center">{formatRupiah(biaya)}</div>
                                </div>
                                <div className=""> Keterangan : {perdinKeterangan}
                                </div> 
                            </div>
                        : <></>}
                        <div className="text-center mt-3">
                            <button onClick={() => handleUpdate(formData.perdin_id, 'approve')} className="text-md rounded-sm text-white mx-auto bg-green-600 w-fit p-3 mr-3">Setuju</button>
                            <button onClick={() => handleUpdate(formData.perdin_id, 'reject')} className="text-md rounded-sm text-white mx-auto bg-red-600 w-fit p-3">Tolak</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default PersetujuanStatus;