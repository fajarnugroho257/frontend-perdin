/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { getAllPerdin, getAllPref } from "../../api/auth";
import { Link } from "react-router-dom";

// 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from "@mui/icons-material/Add";
import Button from '@mui/material/Button';
import { Edit, RestoreFromTrash  } from '@mui/icons-material';

// format rupiah
const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
};
// format date
const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
};

const Perdin = () => {

    // data karyawan
    interface PerdinData {
        perdin_id: string;
        user_id: string;
        pref_id: string;
        perdin_maksud: string;
        perdin_start: string;
        perdin_end: string;
        perdin_durasi: string;
        perdin_biaya: string;
        perdin_st: string;
        perdin_saku: string;
        asal: any;
        tujuan: any;
    }

    const [dataPerdin, setDataPerdin] = useState<PerdinData[]>([]);

    useEffect(() => {
    const getAllDataperdin = async () => {
        try {
            const rsData = await getAllPerdin();
            // console.log(rsData.data);
            setDataPerdin(rsData.data);
        } catch (error) {
            console.error("Gagal mengambil data perdin:", error);
        }
    }
    getAllDataperdin();
}, []);

return (
<>
    <div className="h-screen  w-full">
        <div className={`flex flex-col bg-gray-100 h-screen`}>
            <Header/>
            <div className="m-5 p-5 bg-white flex-1 overflow-y-auto scrollbar-hide rounded-md shadow-md">
                <div className="w-full">
                    <div className="flex justify-between mb-2">
                        <h5>Data Kota</h5>
                        <Button variant="contained" size="small" startIcon={<AddIcon  />} component={Link} to="/perdin/tambah">
                            Tambah
                        </Button>
                    </div>
                    <hr className="mb-3" />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell width={10} align="center">No</TableCell>
                                <TableCell width={150} align="center">Maksud</TableCell>
                                <TableCell align="center">Mulai</TableCell>
                                <TableCell align="center">Selesai</TableCell>
                                <TableCell align="center">Asal</TableCell>
                                <TableCell align="center">Tujuan</TableCell>
                                <TableCell align="center">Durasi</TableCell>
                                <TableCell align="center">Uang Saku</TableCell>
                                <TableCell align="center">Biaya</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {dataPerdin.map((row, index) => (
                                <TableRow
                                key={index}
                                >
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell align="left">{row.perdin_maksud}</TableCell>
                                <TableCell align="center">{formatDate(row.perdin_start)}</TableCell>
                                <TableCell align="center">{formatDate(row.perdin_end)}</TableCell>
                                <TableCell align="center">{row.asal.kota_nama}</TableCell>
                                <TableCell align="center">{row.tujuan.kota_nama}</TableCell>
                                <TableCell align="center">{row.perdin_durasi} Hari</TableCell>
                                <TableCell align="center">{row.perdin_saku === 'yes' ? <div className="text-xs rounded-sm text-white mx-auto bg-green-600 w-fit p-1">Ya</div> : <div className="text-xs rounded-sm text-white mx-auto bg-red-600 w-fit p-1">Tidak</div>}</TableCell>
                                <TableCell align="right">{formatRupiah(parseInt(row.perdin_biaya))}</TableCell>
                                <TableCell align="center">{row.perdin_st === 'waiting' ? <div className="text-xs rounded-sm text-white mx-auto bg-yellow-500 w-fit p-1">Menunggu</div> : row.perdin_st === 'approve' ? <div className="text-xs rounded-sm text-white mx-auto bg-green-600 w-fit p-1">Setuju</div> : <div className="text-xs rounded-sm text-white mx-auto bg-red-600 w-fit p-1">Tolak</div>}</TableCell>
                                <TableCell align="center">
                                    <Link className="text-yellow-500" to={`/perdin/edit/${row.perdin_id}`}>{<Edit/>}</Link>
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

export default Perdin;