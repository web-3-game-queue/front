import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./DataSlice";

export const store = configureStore({
    reducer: {
        store: storeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;