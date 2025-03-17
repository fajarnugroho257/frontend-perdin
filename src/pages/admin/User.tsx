/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { getAllUser, deleteUser } from "../../api/auth";
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

const User = () => {

    // data user
    interface UserData {
        user_id: string;
        username: string;
        password: string;
        nama: string;
        role: string;
    }
    const [dataUser, setDataUser] = useState<UserData[]>([]);
    // get all data user
    const getDataUser = async () => {
        try {
            const rsData = await getAllUser();
            setDataUser(rsData.data);
        } catch (error) {
            console.error("Gagal mendapatkan data user:", error);
        }
    }
    // 
    useEffect(() => {
        getDataUser();
    }, []);

    const deleteDataUser = async (user_id:string) => {
        try {
            const response = await deleteUser(user_id);
            Swal.fire({
                title: "Succes!",
                text: response.message,
                icon: "success",
                confirmButtonText: "OK",
                width: "400px",
                heightAuto:true
            });
            // refresh
            getDataUser();
        } catch (error) {
            console.error("Gagal mendapatkan data user:", error);
        }
    }
    const handleDelete =  (user_id:string) => {
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
            deleteDataUser(user_id);
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
                        <h5>Data Pengguna</h5>
                        {/* <Button variant="contained" size="small" startIcon={<AddIcon  />} component={Link} to="/user/tambah">
                            Tambah
                        </Button> */}
                    </div>
                    <hr className="mb-3" />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">No</TableCell>
                                <TableCell align="center">Nama</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {dataUser.map((data, index) => (
                                <TableRow
                                key={index}
                                >
                                <TableCell width={10} align="center">{index+1}</TableCell>
                                <TableCell align="left">{data.nama}</TableCell>
                                <TableCell align="center">{data.username}</TableCell>
                                <TableCell align="center">{data.role.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">
                                    <Link className="text-yellow-500" to={`/user/edit/${data.user_id}`}>{<Edit/>}</Link>
                                    <a onClick={() => handleDelete(data.user_id)} className="text-red-500 cursor-pointer" >{<RestoreFromTrash/>}</a>
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

export default User;