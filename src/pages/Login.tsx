import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/img/logo.png"
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorpassword, setErrorpassword] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (username.length === 0) {
        setErrorUsername(true);
      } else {
        setErrorUsername(false);
      }
      if (password.length === 0) {
        setErrorpassword(true);
      } else {
        setErrorpassword(false);
      }
      const response = await login(username, password);
      if (!response.success) {
        Swal.fire({
          title: "Error!",
          text: response.message,
          icon: "error",
          confirmButtonText: "OK",
          width: "400px",
          heightAuto:true
        });
      }
      const { token, userRole, user_nama } = response;
      console.log(response);
      auth?.login(token, userRole, user_nama);
      if (userRole === 'pegawai') {
        navigate("/pegawai");
      } else if(userRole === 'sdm'){
        navigate("/admin");
      }
      
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
        console.error("Login failed", error.message);
      } else {
        console.error("Login failed", error);
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center bg-blue-200">
        <div className=" mx-3 md:mx-auto bg-slate-100 w-full md:w-1/4 rounded-lg">
          <div className="p-6">
            <div className="">
              <img className="mx-auto mb-3" src={logo} alt="Logo" width={100} />
            </div>
            <div className="mt-2">
              <TextField
                error={errorUsername}
                id="outlined-textarea"
                label="Username"
                placeholder="Username"
                multiline
                size="small"
                className="bg-white w-full"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <TextField
                error={errorpassword}
                id="outlined-password-input"
                label="Password"
                size="small"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white w-full"
              />
            </div>
            <div className="mt-8 flex justify-between items-center">
              <button className="bg-blue-400 text-white rounded-md py-2 px-3 " onClick={handleLogin}>Masuk</button>
              <Link to="/register" className="underline">Belum punya akun ?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
