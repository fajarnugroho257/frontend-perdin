import { useState, MouseEvent, useContext } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function UserDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useContext(AuthContext);
  // {auth?.logout}
  // handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari sistem!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus token atau sesi login
        auth?.logout();
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-end bg-blue-300">
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{width:30, height:30}} src="" alt="User" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
