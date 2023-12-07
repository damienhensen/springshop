import { configureStore } from "@reduxjs/toolkit";

import generalReducer from "./general/reducers";
import adminReducer from "./admin/reducers";
import authReducer from "./auth/reducers";

const STATE_KEY = "redux";

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STATE_KEY, serializedState);
    } catch (e) {
        console.error('Error saving state to localStorage:', e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem(STATE_KEY);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error('Error loading state from localStorage:', e);
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        general: generalReducer,
        admin: adminReducer,
        auth: authReducer,
    },
    preloadedState: persistedState
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;