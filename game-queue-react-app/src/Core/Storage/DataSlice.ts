import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "./Store";

export interface IStoreState {
    mapIds: number[]
}

const initialState: IStoreState = {
    mapIds: [1, 2, 3]
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
        }
    }
});

export const { addMapId, removeMapId } = dataSlice.actions;

export const useMapIds = () =>
    useSelector((state: RootState) => state.store.mapIds);

export default dataSlice.reducer;