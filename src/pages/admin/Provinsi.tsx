/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { getAllDataProvinsi, deleteProvinsi } from "../../api/auth";
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

const Provinsi = () => {
    // data provinsi
    interface ProvinsiData {
        prov_id: string;
        data_pulau: any;
        prov_nama: string;
    }
    const [dataProvinsi, setDataProvinsi] = useState<ProvinsiData[]>([]);
    // get all data kota
    const getDataProvinsi = async () => {
        try {
            const rsData = await getAllDataProvinsi();
            setDataProvinsi(rsData.data);
        } catch (error) {
            console.error("Gagal mendapatkan data kota:", error);
        }
    }
    // 
    useEffect(() => {
        getDataProvinsi();
    }, []);

    const deleteDataProvinsi = async (prov_id:string) => {
        try {
            const response = await deleteProvinsi(prov_id);
            Swal.fire({
                title: "Succes!",
                text: response.message,
                icon: "success",
                confirmButtonText: "OK",
                width: "400px",
                heightAuto:true
            });
            // refresh
            getDataProvinsi();
        } catch (error) {
            console.error("Gagal mendapatkan data kota:", error);
        }
    }
    const handleDelete = (prov_id:string) => {
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
            deleteDataProvinsi(prov_id);
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
                        <h5>Data Provinsi</h5>
                        <Button variant="contained" size="small" startIcon={<AddIcon  />} component={Link} to="/provinsi/tambah">
                            Tambah
                        </Button>
                    </div>
                    <hr className="mb-3" />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">Provinsi</TableCell>
                                <TableCell align="center">Pulau</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {dataProvinsi.map((data, index) => (
                                <TableRow
                                key={index}
                                >
                                <TableCell width={10} align="center">{index+1}</TableCell>
                                <TableCell align="left">{data.prov_nama}</TableCell>
                                <TableCell align="left">{data.data_pulau.pulau_nama}</TableCell>
                                <TableCell align="center">
                                    <Link className="text-yellow-500" to={`/provinsi/edit/${data.prov_id}`}>{<Edit/>}</Link>
                                    <a onClick={() => handleDelete(data.prov_id)} className="text-red-500 cursor-pointer" >{<RestoreFromTrash/>}</a>
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

export default Provinsi;