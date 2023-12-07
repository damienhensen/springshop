const initialState = {
    user: {},
    isAuthenticated: false,
    showToast: false,
    toastMessage: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user, isAuthenticated: true };
        case "LOGOUT_USER":
            return { ...state, user: {}, isAuthenticated: false };
        case "SHOW_TOAST":
            return { ...state, showToast: true, toastMessage: action.message };
        case "HIDE_TOAST":
            return { ...state, showToast: false };
        default:
            return state;
    }
}

export default authReducer;