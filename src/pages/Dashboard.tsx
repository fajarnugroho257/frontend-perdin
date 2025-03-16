/*eslint-disable*/
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListItemIcon, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import Header from "../components/Headers/Header";

const Pegawai = () => {
  return (
    <>
    <div className="h-screen  w-full">
      <div className={`flex flex-col bg-gray-100 h-screen`}>
        <Header/>
        <div className="m-5 p-5 bg-white flex-1 overflow-y-auto scrollbar-hide rounded-md shadow-md">
          <div className="w-full">
            <div className="flex justify-between mb-2">
                <h5>Dashboard</h5>
            </div>
            <hr className="mb-3" />
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Pegawai;