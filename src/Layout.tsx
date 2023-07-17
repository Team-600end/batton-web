import Navbar from "./components/nav/Navbar";
import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { navbarProjectDropdown } from "./state/ModalState";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
