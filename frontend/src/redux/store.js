import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/reducers";

const store = configureStore({
    reducer: {
        admin: adminReducer
    }
});

export default store;