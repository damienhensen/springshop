export const parseJWT = (jwt) => {
    if (!jwt) return {};

    const base64Payload = jwt.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
}

export const setStoreUser = (jwt) => ({
    type: "SET_USER",
    user: parseJWT(jwt),
});

export const logoutUser = () => ({
    type: "LOGOUT_USER",
});

export const showToast = (msg) => ({
    type: "SHOW_TOAST",
    message: msg
});

export const hideToast = () => ({
    type: "HIDE_TOAST",
});