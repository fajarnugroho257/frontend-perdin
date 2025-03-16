/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { allDataKota, deleteKota } from "../../api/auth";
import { Link } from "react-router-dom";
import { Edit, RestoreFromTrash  } from '@mui/icons-material';
import AddIcon from "@mui/icons-material/Add";
import Button from '@mui/material/Button';
// 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from "sweetalert2";

const Kota = () => {

    // data karyawan
    interface PerdinData {
        kota_id: string;
        kota_nama: string;
        kota_latitude: string;
        kota_longitude: string;
        data_provinsi: any;
        data_pulau: any;
        kota_pulau: string;
        kota_st: string;
    }
    const [dataKota, setDataKota] = useState<PerdinData[]>([]);
    // get all data kota
    const getAllDataKota = async () => {
        try {
            const rsData = await allDataKota();
            setDataKota(rsData.data);
        } catch (error) {
            console.error("Gagal mendapatkan data kota:", error);
        }
    }
    // 
    useEffect(() => {
        getAllDataKota();
    }, []);

    const deleteDataKota = async (kota_id:string) => {
        try {
            const response = await deleteKota(kota_id);
            Swal.fire({
                title: "Succes!",
                text: response.message,
                icon: "success",
                confirmButtonText: "OK",
                width: "400px",
                heightAuto:true
            });
            // refresh
            getAllDataKota();
        } catch (error) {
            console.error("Gagal mendapatkan data kota:", error);
        }
    }
    const handleDelete =  (kota_id:string) => {
        Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Akan menghapus data ini!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Hapus...!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            // hapus data
            deleteDataKota(kota_id);
          }
        });
      };

return (
<>
    <div className="h-screen  w-full">
        <div className={`flex flex-col bg-gray-100 h-screen`}>
            <Header/>
            <div className="m-5 p-5 bg-white flex-1 overflow-y-auto scrollbar-hide rounded-md shadow-md">
                <div className="w-full">
                    <div className="flex justify-between mb-2">
                        <h5>Data Kota</h5>
                        <Button variant="contained" size="small" startIcon={<AddIcon  />} component={Link} to="/kota/tambah">
                            Tambah
                        </Button>
                    </div>
                    <hr className="mb-3" />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">Kota</TableCell>
                                <TableCell align="center">Provinsi</TableCell>
                                <TableCell align="center">Pulau</TableCell>
                                <TableCell align="center">Latitude</TableCell>
                                <TableCell align="center">Longitude</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {dataKota.map((data, index) => (
                                <TableRow
                                key={index}
                                >
                                <TableCell width={10} align="center">{index+1}</TableCell>
                                <TableCell align="left">{data.kota_nama}</TableCell>
                                <TableCell align="left">{data.data_provinsi.prov_nama}</TableCell>
                                <TableCell align="left">{data.data_pulau.pulau_nama}</TableCell>
                                <TableCell align="left">{data.kota_latitude}</TableCell>
                                <TableCell align="left">{data.kota_longitude}</TableCell>
                                <TableCell align="center">{data.kota_st}</TableCell>
                                <TableCell align="center">
                                    <Link className="text-yellow-500" to={`/kota/edit/${data.kota_id}`}>{<Edit/>}</Link>
                                    <a onClick={() => handleDelete(data.kota_id)} className="text-red-500 cursor-pointer" >{<RestoreFromTrash/>}</a>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    </div>
</>
);
}

export default Kota;