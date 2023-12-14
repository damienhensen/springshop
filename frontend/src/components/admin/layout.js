import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { stopLoading } from "@/redux/general/actions";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const toastType = useSelector((state) => state.auth.toastType);
  const toastMessage = useSelector((state) => state.auth.toastMessage);

  useEffect(() => {
    if (user.role) {
      if (user.role != "ADMIN") {
        router.push("/");
      }
    } else {
      router.push("/login")
    }

    dispatch(stopLoading());
  }, [user, router]);

  useEffect(() => {
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
  }, [toastType, toastMessage]);

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      <div className="flex-1 flex">
        {/* Admin Nav */}
        <aside className="p-4 bg-slate-700 text-white flex flex-col gap-4 w-64">
          <h1 className="mb-4 uppercase font-bold text-center">Company</h1>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin">Orders</Link>
          <Link href="/admin">Support</Link>
        </aside>

        <div className="flex-1 flex flex-col h-screen adminWidth">
          {/* Header */}
          <header className="p-4 bg-slate-700 text-white w-full flex justify-between items-center">
            <h1>My Next.js App</h1>

            <Link href="/" className="p-2 px-4 bg-slate-500 rounded-md uppercase hover:bg-slate-800 transition-all">Back to site</Link>
          </header>

          {/* Main content */}
          <main className="p-8 flex-1 overflow-y-auto overflow-x-hidden">{children}</main>

          <ToastContainer />
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;