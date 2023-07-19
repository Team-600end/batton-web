import Navbar from "./components/nav/Navbar";
import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  navbarNoticeDd,
  navbarProfileDd,
  navbarProjectDd,
} from "@state/modalState";

function Layout() {
  const [projectDd, setProjectDd] = useRecoilState(navbarProjectDd);
  const [noticeDd, setNoticeDd] = useRecoilState(navbarNoticeDd);
  const [profileDd, setProfileDd] = useRecoilState(navbarProfileDd);

  const handleAllDdOff = () => {
    setNoticeDd(false);
    setProjectDd(false);
    setProfileDd(false);
  };

  return (
    <div>
      <Navbar />
      <div onClick={() => handleAllDdOff()}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
