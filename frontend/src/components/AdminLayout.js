import "@/app/globals.css"
import Link from "next/link"

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      <div className="flex-1 flex">
        {/* Admin Nav */}
        <aside className="p-4 bg-slate-700 text-white flex flex-col gap-4 w-64">
          <h1 className="mb-4 uppercase font-bold text-center">Company</h1>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products/create">Products</Link>
          <Link href="/admin">Orders</Link>
          <Link href="/admin">Support</Link>
        </aside>

        <div className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <header className="p-4 bg-slate-700 text-white w-full">
            <h1>My Next.js App</h1>
          </header>

          {/* Main content */}
          <main className="p-8 flex-1 overflow-auto">{children}</main>
        </div>
      </div>

    </div>
  );
};