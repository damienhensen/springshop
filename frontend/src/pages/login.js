import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { connect } from "react-redux";

import { setStoreUser } from "@/redux/auth/actions";
import { startLoading, stopLoading } from "@/redux/general/actions";

import { AuthAdaptor } from "@/services/AuthAdaptor";

import Layout from "@/components/layout";
import Loading from "@/components/loading";

const mapStateToProps = (state) => ({
    storeUser: state.auth.user,
    loading: state.general.loading
});

const mapDispatchToProps = {
    setStoreUser,
    startLoading,
    stopLoading,
}

const Login = ({ storeUser, loading, setStoreUser, startLoading, stopLoading }) => {
    const router = useRouter();
    const authAdaptor = new AuthAdaptor("");
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const tryLogin = async () => {
        startLoading();
        await authAdaptor.login(user)
            .then(response => {
                setStoreUser(response.data);
                stopLoading();
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
            {loading ? <Loading /> : <></>}

            <h1 className="font-bold text-2xl uppercase mb-8">Login</h1>
            
            <input type="text" onChange={(evt) => setUser({ ...user, email: evt.target.value })} />
            <input type="text" onChange={(evt) => setUser({ ...user, password: evt.target.value })} />
            <button onClick={tryLogin}>login</button>
        </Layout>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);