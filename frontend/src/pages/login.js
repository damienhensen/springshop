import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { setStoreUser, showToast } from "@/redux/auth/actions";
import { startLoading, stopLoading } from "@/redux/general/actions";

import { AuthAdaptor } from "@/services/AuthAdaptor";

import Layout from "@/components/layout";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const authAdaptor = new AuthAdaptor("");

    const storeUser = useSelector((state) => state.auth.user);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const tryLogin = async () => {
        dispatch(startLoading());
        await authAdaptor.login(user)
            .then(response => {
                if (response.success) {
                    dispatch(setStoreUser(response.data));
                    dispatch(showToast(response.message, "success"));
                } else {
                    dispatch(showToast(response.message, "error"));
                }

                dispatch(stopLoading());
            })
            .catch(console.error);
    }

    useEffect(() => {
        if (storeUser.role) {
            if (storeUser.role == "ADMIN") {
                router.push("/admin")
            } else {
                router.push("/")
            }
        }
    }, [storeUser])

    return (
        <Layout>
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-[25em] bg-white px-8 py-12 rounded-md shadow-md">
                    <h1 className="font-bold text-2xl">Login</h1>
                    <p className="text-slate-600">Don't have an account yet? <Link className="text-blue-500 underline" href="/sign-up">Sign up</Link></p>

                    <div className="flex flex-col gap-6 mt-8">
                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="email" className="font-bold">E-mail Address</label>
                            <input className="border border-slate-700 rounded-md px-6 py-3 font-normal" type="text" id="email" placeholder="you@example.com" onChange={(evt) => setUser({ ...user, email: evt.target.value })} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="font-bold">Password</label>
                                <Link className="text-blue-500 underline" href="/forgot-password">Forgot password?</Link>
                            </div>
                            <input className="border border-slate-700 rounded-md px-6 py-3 font-normal" type="text" id="password" placeholder="Password" onChange={(evt) => setUser({ ...user, password: evt.target.value })} />
                        </div>
                        <button onClick={tryLogin} className="py-4 bg-blue-500 hover:bg-blue-700 transition-all text-white uppercase font-semibold rounded-md">Log in</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;