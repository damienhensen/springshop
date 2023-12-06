import Link from "next/link"
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import "@/app/globals.css"

export default function Layout({ children }) {
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