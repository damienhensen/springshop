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
    type: "SET_USER",
    user: {},
});