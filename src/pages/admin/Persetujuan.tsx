/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { getAllPerdinPersetujuan, updateStatus } from "../../api/auth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { EditNote  } from '@mui/icons-material';

// 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const Persetujuan = () => {

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
        user: any;
    }
    // state
    const [dataPerdin, setDataPerdin] = useState<PerdinData[]>([]);
    const getAllDataperdin = async () => {
        try {
            const rsData = await getAllPerdinPersetujuan();
            // console.log(rsData.data);
            setDataPerdin(rsData.data);
        } catch (error) {
            console.error("Gagal mengambil data perdin:", error);
        }
    }
    useEffect(() => {
        getAllDataperdin();
    }, []);
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
            getAllDataperdin();
        }
    }
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
                        <h5>Data Persetujuan</h5>
                    </div>
                    <hr className="mb-3" />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell width={10} align="center">No</TableCell>
                                <TableCell align="center">Nama</TableCell>
                                <TableCell width={150} align="center">Maksud</TableCell>
                                <TableCell align="center">Mulai</TableCell>
                                <TableCell align="center">Selesai</TableCell>
                                <TableCell align="center">Asal</TableCell>
                                <TableCell align="center">Tujuan</TableCell>
                                <TableCell align="center">Durasi</TableCell>
                                <TableCell align="center">Uang Saku</TableCell>
                                <TableCell align="center">Biaya</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Approve</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {dataPerdin.map((row, index) => (
                                <TableRow
                                key={index}
                                >
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell align="left">{row.user.nama}</TableCell>
                                <TableCell align="left">{row.perdin_maksud}</TableCell>
                                <TableCell align="center">{formatDate(row.perdin_start)}</TableCell>
                                <TableCell align="center">{formatDate(row.perdin_end)}</TableCell>
                                <TableCell align="center">{row.asal.kota_nama}</TableCell>
                                <TableCell align="center">{row.tujuan.kota_nama}</TableCell>
                                <TableCell align="center">{row.perdin_durasi} Hari</TableCell>
                                <TableCell align="center">{row.perdin_saku === 'yes' ? <div className="text-xs rounded-sm text-white mx-auto bg-green-600 w-fit p-1">Ya</div> : <div className="text-xs rounded-sm text-white mx-auto bg-red-600 w-fit p-1">Tidak</div>}</TableCell>
                                <TableCell align="right">{formatRupiah(parseInt(row.perdin_biaya))}</TableCell>
                                <TableCell align="center">
                                    {row.perdin_st === 'waiting' ? <div className="text-xs rounded-sm text-white mx-auto bg-yellow-500 w-fit p-1">Menunggu</div> : 
                                    row.perdin_st === 'approve' ? <div className="text-xs rounded-sm text-white mx-auto bg-green-600 w-fit p-1">Setuju</div> : 
                                    <div className="text-xs rounded-sm text-white mx-auto bg-red-600 w-fit p-1">Tolak</div>}
                                </TableCell>
                                <TableCell align="center">
                                    {/* <div className="flex md:block">
                                        <button onClick={() => handleUpdate(row.perdin_id, 'approve')} className="text-xs rounded-sm text-white mx-auto bg-green-600 w-fit p-1 mr-1">Setuju</button>
                                        <button onClick={() => handleUpdate(row.perdin_id, 'reject')} className="text-xs rounded-sm text-white mx-auto bg-red-600 w-fit p-1">Tolak</button>
                                    </div> */}
                                    <Link className="text-blue-500" to={`/persetujuan/edit/${row.perdin_id}`}>{<EditNote/>}</Link>
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

export default Persetujuan;