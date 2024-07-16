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
    dispatch(getMe());
  }, []);
  return (
    <>
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
