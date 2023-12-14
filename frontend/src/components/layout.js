import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";

import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import Header from "./header";
import Loading from "./loading";

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(true);

  const loading = useSelector((state) => state.general.loading);
  const toastType = useSelector((state) => state.auth.toastType);
  const toastMessage = useSelector((state) => state.auth.toastMessage);

  useEffect(() => {
    if (!mounted) {
      switch (toastType) {
        case "error":
          toast.error(toastMessage);
          break;
        case "info":
          toast.info(toastMessage);
          break;
        default:
          toast.success(toastMessage);
          break;
      }
    }

    return () => setMounted(false);
  }, [toastType, toastMessage]);

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {loading && <Loading />}

      <Header />
      <main className="p-8 flex-1 bg-slate-100">{children}</main>
      <footer className="p-4 bg-slate-700 text-white w-full">
        <Link href="/">Home</Link>
      </footer>

      <ToastContainer />
    </div>
  )
};

export default Layout;