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
    currentRequestId: number | null,
    filterMapName: string | undefined,
    filterMapMaxPlayersCount: number | undefined
}

const initialState: IStoreState = {
    mapIds: [],
    auth: null,
    currentRequestId: null,
    filterMapName: undefined,
    filterMapMaxPlayersCount: undefined
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
        },
        reset: (state) => {
            state.mapIds = initialState.mapIds;
            state.auth = initialState.auth;
            state.currentRequestId = initialState.currentRequestId;
        },
        setFilterMapName: (state, action: PayloadAction<string | undefined>) => {
            state.filterMapName = action.payload;
        },
        setFilterMapMaxPlayersCount: (state, action: PayloadAction<number | undefined>) => {
            state.filterMapMaxPlayersCount = action.payload;
        }
    }
});

export const { setMapIds, addMapId, removeMapId, setAuth, setCurrentRequestId, reset, setFilterMapName, setFilterMapMaxPlayersCount } = dataSlice.actions;

export const useMapIds = () =>
    useSelector((state: RootState) => state.store.mapIds);

export const useAuth = () =>
    useSelector((state: RootState) => {
        return state.store.auth;
    });

export const useCurrentRequestId = () =>
    useSelector((state: RootState) => state.store.currentRequestId);

export const useFilterMapName = () =>
    useSelector((state: RootState) => state.store.filterMapName);

export const useFilterMapMaxPlayersCount = () =>
    useSelector((state: RootState) => state.store.filterMapMaxPlayersCount);

export default dataSlice.reducer;