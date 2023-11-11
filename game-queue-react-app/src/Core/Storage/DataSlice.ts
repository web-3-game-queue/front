import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "./Store";

export interface IStoreState {
    mapIds: number[],
    login: string | null,
    currentRequestId: number | null
}

const initialState: IStoreState = {
    mapIds: [1, 2, 3],
    login: null,
    currentRequestId: null
}

export const dataSlice = createSlice({
    name: "storage",
    initialState,
    reducers: {
        addMapId: (state, action: PayloadAction<number>) => {
            state.mapIds.push(action.payload);
        },
        removeMapId: (state, action: PayloadAction<number>) => {
            const index = state.mapIds.findIndex(p => p == action.payload);
            if (index != -1) {
                state.mapIds.splice(index, 1);
            }
        },
        setLogin: (state, action: PayloadAction<string | null>) => {
            state.login = action.payload;
        },
        setCurrentRequestId: (state, action: PayloadAction<number | null>) => {
            state.currentRequestId = action.payload;
        }
    }
});

export const { addMapId, removeMapId, setLogin, setCurrentRequestId } = dataSlice.actions;

export const useMapIds = () =>
    useSelector((state: RootState) => state.store.mapIds);

export const useLogin = () =>
    useSelector((state: RootState) => state.store.login);

export const useCurrentRequestId = () =>
    useSelector((state: RootState) => state.store.currentRequestId);

export default dataSlice.reducer;