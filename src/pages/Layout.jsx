import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { getMe } from "../store/features/auth/authSlice";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getMe());
    }
  }, []);
  return (
    <>
      <Header />
      <div className=" flex-grow bg-[#1E1E1E]">
        <div className=" h-96 w-96 rounded-full absolute top-[20%] left-[80%]  opacity-70 z-0 blur-3xl bg-[#FDC959B2]"></div>
        <Outlet />
      </div>
      <div className="h-96 w-96 rounded-full absolute top-[80%] left-[-20%] opacity-70 z-0 blur-3xl bg-[#FD5E0AB2]"></div>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
