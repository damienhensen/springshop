import { logoutUser, showToast } from "@/redux/auth/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userRole = useSelector(state => state.auth.user.role);

    const logout = () => {
        dispatch(logoutUser());
        dispatch(showToast("Logged out!"))
        router.push("/login")
    }

    return (
        <header className="p-4 bg-slate-700 text-white w-full flex justify-between items-center">
            <Link href="/">Home</Link>

            <nav className="flex justify-between items-center gap-4">
                {!isAuthenticated && <Link href="/login">Log in</Link>}
                {!isAuthenticated && <Link href="/sign-up">Sign up</Link>}
                {isAuthenticated && userRole === "ADMIN" && <Link href="/admin">Admin Dashboard</Link>}
                {isAuthenticated && <button onClick={logout}>Log out</button>}
            </nav>
        </header>
    )
}

export default Header;