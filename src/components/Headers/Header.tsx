import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";

const Header = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <div className="h-14 flex items-center bg-blue-300 sticky top-0 z-10">
        <div className="w-full px-6">
          <div className="flex justify-between items-center">
            <h5 className={`text-black sticky  ${true ? "block" : "hidden"}`}>{role?.toString().toUpperCase()}</h5>
            <div>
              <UserDropdown/>
              {/* <img className="cursor-pointer inline-block size-6 rounded-full ring-4 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;