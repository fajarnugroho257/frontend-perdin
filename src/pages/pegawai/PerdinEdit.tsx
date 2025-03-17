/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { allDataKota, getAllPref, updatePerdin, detailDataPerdin } from "../../api/auth";
import { Link, useParams, useNavigate } from "react-router-dom";
import getDistanceBetweenPoints from "../../util/HitungJarak";
// 
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { Save, ArrowBack } from '@mui/icons-material';
import { MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import { object } from "prop-types";

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

const PerdinEdit = () => {
    // params
    const { perdinID } = useParams();
    const navigate = useNavigate();
    // data
    const noData = {
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
    const alertKota = () => {
        Swal.fire({
            title: "Error!",
            text: "Kota asal dan tujuan tidak boleh sama...!",
            icon: "error",
            confirmButtonText: "OK",
            width: "400px",
            heightAuto:true
        });
    }
    const [tempuh, setTempuh] = useState(0);
    const [formData, setFormData] = useState(noData);
    const [perdinKeterangan, setPerdinKeterangan] = useState("");
    const [perdinValue, setPerdinValue] = useState("");
    // input onchange
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        // cek jika tanggal mulai
        if (name === 'perdin_start') {
            formData['perdin_durasi'] = calculateDateDifference(value, formData['perdin_end']).toString();
            // biaya
            const ketPreference = dataPreference.filter((val) => val.pref_id === formData['pref_id']);
            formData['perdin_biaya'] = (parseInt(formData['perdin_durasi']) * parseInt(ketPreference[0]['pref_value'])).toString();
        }
        if (name === 'perdin_end') {
            formData['perdin_durasi'] = calculateDateDifference(value, formData['perdin_start']).toString();
            // biaya
            const ketPreference = dataPreference.filter((val) => val.pref_id === formData['pref_id']);
            formData['perdin_biaya'] = (parseInt(formData['perdin_durasi']) * parseInt(ketPreference[0]['pref_value'])).toString();
        }
        if (name === 'perdin_asal') {
            const selected = dataKota.filter((val) => val.kota_id === value);
            const asal = formData['perdin_tujuan'];
            if (value === asal) {
                alertKota();
                return;
            }
            // isi latitude
            formData['perdin_asal_latitude'] = selected[0]['kota_latitude'];
            formData['perdin_asal_longitude'] = selected[0]['kota_longitude'];
            formData['perdin_asal_prov'] = selected[0]['prov_id'];
            formData['perdin_asal_pulau'] = selected[0]['pulau_id'];
            formData['perdin_asal_dalam'] = selected[0]['kota_st'];
        }
        if (name === 'perdin_tujuan') {
            const selected = dataKota.filter((val) => val.kota_id === value);
            const asal = formData['perdin_asal'];
            if (value === asal) {
                alertKota();
                return;
            }
            // isi latitude
            formData['perdin_tujuan_latitude'] = selected[0]['kota_latitude'];
            formData['perdin_tujuan_longitude'] = selected[0]['kota_longitude'];
            formData['perdin_tujuan_prov'] = selected[0]['prov_id'];
            formData['perdin_tujuan_pulau'] = selected[0]['pulau_id'];
            formData['perdin_tujuan_dalam'] = selected[0]['kota_st'];
        }
        // 
        const jarakTempuh = getDistanceBetweenPoints(formData['perdin_asal_latitude'], formData['perdin_asal_longitude'],formData['perdin_tujuan_latitude'],formData['perdin_tujuan_longitude']);
        // 
        if (name === 'perdin_asal' || name === 'perdin_tujuan') {
            if (jarakTempuh > 60) {
                formData['perdin_saku'] = 'yes';
                // satu_prov
                if (formData['perdin_asal_prov'] === formData['perdin_tujuan_prov']) {
                    // alert('satu_prov');
                    formData['pref_id'] = '002';
                } else if(formData['perdin_asal_prov'] !== formData['perdin_tujuan_prov'] && formData['perdin_asal_pulau'] === formData['perdin_tujuan_pulau']){
                    // luar_prov_sama_pulau
                    // alert("luar_prov_sama_pulau");
                    formData['pref_id'] = '003';
                } else if(formData['perdin_asal_prov'] !== formData['perdin_tujuan_prov'] && formData['perdin_asal_pulau'] !== formData['perdin_tujuan_pulau']){
                    // luar_prov_beda_pulau
                    if (formData['perdin_tujuan_dalam'] === 'no') {
                        // alert('luar_negeri');
                        formData['pref_id'] = '005';
                    } else {
                        // alert('luar_prov_beda_pulau');
                        formData['pref_id'] = '004';
                    }
                }
            } else {
                formData['perdin_saku'] = 'no';
                formData['pref_id'] = '006';
            }
            const ketPreference = dataPreference.filter((val) => val.pref_id === formData['pref_id']);
            // set state
            setPerdinKeterangan(ketPreference[0]['pref_ket']);
            setPerdinValue(ketPreference[0]['pref_value']);
            // biaya
            formData['perdin_biaya'] = (parseInt(formData['perdin_durasi']) * parseInt(ketPreference[0]['pref_value'])).toString();
        }
        setTempuh(jarakTempuh);
        setFormData((prevData) => ({
            ...prevData, [name]:value,
        }));
    }
    // data karyawan
    interface KotaData {
        kota_id: string;
        kota_nama: string;
        kota_latitude: string;
        kota_longitude: string;
        prov_id: string;
        pulau_id: string;
        kota_st: string;
    }
    // 
    const [dataKota, setDataKota] = useState<KotaData[]>([]);
    const getAllDataKota = async () => {
        try {
            const response = await allDataKota();
            setDataKota(response.data);
        } catch (error) {
            console.error("Gagal mengambil data kota:", error);
        }
    }
    
    // preference
    interface data_preference {
        pref_id: string;
        pref_name: string;
        pref_value: string;
        pref_ket: string;
    }
    const [dataPreference, setDataPreference] = useState<data_preference[]>([]);
    // jumlah biaya
    const biaya = parseInt(perdinValue) * parseInt(formData.perdin_durasi);
    const getDetailData = async (perdinID:string) => {
        try {
            const response = await detailDataPerdin(perdinID);
            if (response.success) {
                const aturData = {
                    perdin_maksud: response.data.perdin_maksud,
                    pref_id: response.data.pref_id,
                    perdin_start: response.data.perdin_start,
                    perdin_end: response.data.perdin_end,
                    perdin_asal: response.data.perdin_asal,
                    perdin_tujuan: response.data.perdin_tujuan,
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
                navigate('/perdin');
            }
        } catch (error) {
            console.error("Gagal mengambil data kota:", error);
        }
    }

    useEffect(() => {
        getDetailData(perdinID?? "");
        getAllDataKota();
        // getAllPreference();
    }, []);

    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // store
        try {
            // console.log(formData);
            const response = await updatePerdin(formData, perdinID ?? "");
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
            // setFormData(noData);
        } catch (error) {
            console.error("Gagal insert data kota:", error);
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
                                <h5>Edit Data Perdin</h5>
                                <Button variant="contained" size="small" startIcon={<ArrowBack />} component={Link} to="/perdin">
                                    Kembali
                                </Button>
                            </div>
                            <hr className="mb-3" />
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <TextField
                                    required
                                    aria-hidden
                                    label="Tanggal Mulai"
                                    type="date"
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    name="perdin_start"
                                    value={formData.perdin_start}
                                    onChange={handleOnChange}
                                    />
                                    <TextField
                                    required
                                    aria-hidden
                                    label="Tanggal Selesai"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    name="perdin_end"
                                    value={formData.perdin_end}
                                    onChange={handleOnChange}
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
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Select aria-hidden required size="small" name="perdin_asal" value={formData.perdin_asal} onChange={handleOnChange}>
                                        <MenuItem value="" disabled>
                                        Pilih salah satu...
                                        </MenuItem>
                                        {dataKota && dataKota.map((val, index) => {
                                            return <MenuItem key={index} value={val.kota_id}>{val.kota_nama}</MenuItem>
                                        })}
                                    </Select>
                                    <Select aria-hidden required size="small" name="perdin_tujuan" value={formData.perdin_tujuan} onChange={handleOnChange}>
                                        <MenuItem value="" disabled>
                                        Pilih salah satu...
                                        </MenuItem>
                                        {dataKota && dataKota.map((val, index) => {
                                            return <MenuItem key={index} value={val.kota_id}>{val.kota_nama}</MenuItem>
                                        })}
                                    </Select>
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
                                onChange={handleOnChange}
                                />
                                <div className="w-5">
                                    <Button type="submit" size="small" variant="contained" color="success" startIcon={<Save />}>Simpan</Button>
                                </div>
                            </form>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PerdinEdit;