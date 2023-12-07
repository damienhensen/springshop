import "@/app/globals.css";

import Link from "next/link";
import { useRouter } from "next/router";

import { connect } from "react-redux";

import { logoutUser } from "@/redux/auth/actions";
import { startLoading, stopLoading } from "@/redux/general/actions";

import Loading from "./loading";


const mapStateToProps = (state) => ({
  loading: state.general.loading,
});

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  logoutUser,
}

const Layout = ({ children, loading, startLoading, stopLoading, logoutUser }) => {
  const router = useRouter();

  const logout = () => {
    startLoading();
    logoutUser();
    stopLoading();

    router.push("/login")
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {loading ? <Loading /> : <></>}

      <header className="p-4 bg-slate-700 text-white w-full flex justify-between items-center">
        <Link href="/">Home</Link>

        <nav className="flex justify-between items-center gap-4">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/admin">Admin Dashboard</Link>
          <button onClick={logout}>logout</button>
        </nav>
      </header>

      <main className="p-8 flex-1">{children}</main>

      <footer className="p-4 bg-slate-700 text-white w-full">
        <Link href="/">Home</Link>
      </footer>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);