const initialState = {
    token: "",
    user: {},
    isAuthenticated: false,
    toastMessage: "",
    toastType: "success",
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user, token: action.token, isAuthenticated: true };
        case "LOGOUT_USER":
            return { ...state, user: {}, token: "", isAuthenticated: false };
        case "SHOW_TOAST":
            return { ...state, showToast: true, toastMessage: action.message, toastType: action.toastType };
        default:
            return state;
    }
}

export default authReducer;