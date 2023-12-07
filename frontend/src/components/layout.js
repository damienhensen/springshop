import "@/app/globals.css";

import { useEffect } from "react";

import Link from "next/link";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { hideToast } from "@/redux/auth/actions";

import Header from "./header";
import Loading from "./loading";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.general.loading);
  const showToast = useSelector((state) => state.auth.showToast);
  const toastMessage = useSelector((state) => state.auth.toastMessage);

  useEffect(() => {
    if (showToast) {
      toast.success(toastMessage);
      dispatch(hideToast());
    }
  }, [showToast, toastMessage]);

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {loading && <Loading />}

      <Header />
      <main className="p-8 flex-1">{children}</main>
      <footer className="p-4 bg-slate-700 text-white w-full">
        <Link href="/">Home</Link>
      </footer>
    </div>
  )
};

export default Layout;