/*eslint-disable*/
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItemText } from "@mui/material";
// import { useContext } from "react";
import SettingsIcon from "@mui/icons-material/Menu";


export default function Sidebar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [sideBar, setSideBar] = useState(true);
  const handleSidebar = () => {
    setSideBar(!sideBar);
  }
  const location = useLocation();
  const path = location.pathname;
  const manuUtama = path.split('/');
  let dataMenu = [];
  if (role === 'pegawai') {
    dataMenu = [
      {link: "/pegawai", name:"Dashboard", logo: "fa fa-dashboard", menus: ['pegawai']},
      {link: "/perdin", name:"Perjalanan Dinas", logo: "fa fa-bank", menus: ['perdin']}
    ];
  } else if(role === 'sdm') {
    dataMenu = [
      {link: "/admin", name:"Dashboard", logo: "fa fa-dashboard", menus: ['admin']},
      {link: "/kota", name:"Data Kota", logo: "fa fa-city", menus: ['kota']},
      {link: "/persetujuan", name:"Persetujuan", logo: "fa fa-bank", menus: ['persetujuan']}
    ];
  } else {
    dataMenu = [{link: "/xxx", name:"Dashboard", logo: "fa fa-bank", menus: ['/xxx']},];
  }
  
  return (
    
    <>
    <div className="flex h-screen">
      <div className={`flex flex-col bg-gray-100 h-screen border-r border-gray-300 ${sideBar ? "w-fit md:w-52" : "md:w-fit"}`}>
        <div className="h-14 flex items-center border-b border-gray-300 bg-gray-100 sticky top-0 z-10">
          <div className="w-full px-2">
            <div className="flex justify-between">
              <h5 className={`text-black sticky mx-2 ${sideBar ? "hidden md:block" : "hidden"}`}>{role?.toString().toUpperCase()}</h5>
              <div className={` ${sideBar ? "mx-auto md:mx-0" : "md:mx-auto"}`}>
                <SettingsIcon className="cursor-pointer" onClick={handleSidebar}/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <ul>
            {dataMenu.map((data) => (
            <li onClick={() => navigate(data.link)} key={data.name} className={`cursor-pointer hover:bg-gray-700 hover:text-white rounded-md m-3 ${data.menus?.includes(manuUtama[1])? "bg-gray-700 text-white" : "text-black"}`}>
              <div className={`flex items-center gap-2 p-3 ${data.menus?.includes(manuUtama[1])? "" : "border-b border-black"}`}>
                <i className={data.logo}> </i>
                <ListItemText primary={data.name} className={`${sideBar ? "hidden md:block" : "hidden"}`} />
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
