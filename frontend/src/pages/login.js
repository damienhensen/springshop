import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { setStoreUser, showToast } from "@/redux/auth/actions";
import { startLoading, stopLoading } from "@/redux/general/actions";

import { AuthAdaptor } from "@/services/AuthAdaptor";

import Layout from "@/components/layout";

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
                dispatch(setStoreUser(response.data));
                dispatch(stopLoading());
                dispatch(showToast("Logged in!"));
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
            <h1 className="font-bold text-2xl uppercase mb-8">Login</h1>

            <input type="text" onChange={(evt) => setUser({ ...user, email: evt.target.value })} />
            <input type="text" onChange={(evt) => setUser({ ...user, password: evt.target.value })} />
            <button onClick={tryLogin}>login</button>
        </Layout>
    );
}

export default Login;