import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "./Store";

interface IAuth {
    login: string,
    selfId: number
}

export interface IStoreState {
    mapIds: number[],
    auth: IAuth | null,
    currentRequestId: number | null
}

const initialState: IStoreState = {
    mapIds: [],
    auth: null,
    currentRequestId: null
}

export const dataSlice = createSlice({
    name: "storage",
    initialState,
    reducers: {
        setMapIds: (state, action: PayloadAction<number[]>) => {
            state.mapIds = action.payload;
        },
        addMapId: (state, action: PayloadAction<number>) => {
            state.mapIds.push(action.payload);
        },
        removeMapId: (state, action: PayloadAction<number>) => {
            const index = state.mapIds.findIndex(p => p == action.payload);
            if (index != -1) {
                state.mapIds.splice(index, 1);
            }
        },
        setAuth: (state, action: PayloadAction<IAuth | null>) => {
            state.auth = action.payload;
        },
        setCurrentRequestId: (state, action: PayloadAction<number | null>) => {
            state.currentRequestId = action.payload;
        }
    }
});

export const { setMapIds, addMapId, removeMapId, setAuth, setCurrentRequestId } = dataSlice.actions;

export const useMapIds = () =>
    useSelector((state: RootState) => state.store.mapIds);

export const useAuth = () =>
    useSelector((state: RootState) => {
        return state.store.auth;
    });

export const useCurrentRequestId = () =>
    useSelector((state: RootState) => state.store.currentRequestId);

export default dataSlice.reducer;