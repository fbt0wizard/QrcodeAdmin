import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    swithScreen: false
};

const otherSlice = createSlice({
    name: 'SWITCHER',
    initialState,
    reducers: {
        switchAwardPoint: (state, action) => {
            state.swithScreen = action.payload
        },
    }
})

export default otherSlice.reducer
export const { switchAwardPoint } = otherSlice.actions          