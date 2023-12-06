const initialState = {
    savedProductToastVisible: false,
    editedProductToastVisible: false,
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_PRODUCT_SAVED_TOAST":
            return { ...state, savedProductToastVisible: true };
        case "HIDE_PRODUCT_SAVED_TOAST":
            return { ...state, savedProductToastVisible: false };
        case "SHOW_PRODUCT_EDITED_TOAST":
            return { ...state, editedProductToastVisible: true };
        case "HIDE_PRODUCT_EDITED_TOAST":
            return { ...state, editedProductToastVisible: false };
        default:
            return state;
    }
}

export default adminReducer;