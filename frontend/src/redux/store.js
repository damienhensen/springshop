import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import generalReducer from "./general/reducers";
import adminReducer from "./admin/reducers";
import authReducer from "./auth/reducers";

const persistConfig = {
    key: "redux",
    storage
}

const reducers = {
    general: generalReducer,
    admin: adminReducer,
    auth: authReducer,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export const persistor = persistStore(store);