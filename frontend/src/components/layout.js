import "@/app/globals.css"
import Link from "next/link"

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Header */}
      <header className="p-4 bg-slate-700 text-white w-full flex justify-between items-center">
        <h1>My Next.js App</h1>
        <Link href="/admin">Admin Dashboard</Link>
      </header>

      {/* Main content */}
      <main className="p-8 flex-1">{children}</main>

      {/* Footer */}
      <footer className="p-4 bg-slate-700 text-white w-full">
        <h1>My Next.js App</h1>
      </footer>
    </div>
  );
};