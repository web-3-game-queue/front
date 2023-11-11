import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./DataSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer<ReturnType<typeof storeReducer>>(
    persistConfig, storeReducer);

export const store = configureStore({
    reducer: {
        store: persistedReducer
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;