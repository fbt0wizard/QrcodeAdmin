import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alert: "",
    alertType: "",
    deleteAlert: ""
};

const alertSlice = createSlice({
    name: 'PRODUCTS',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alert = action.payload.alert
            state.alertType = action.payload.type
            state.deleteAlert = action.payload.delete
        },
        clearAlert: (state) => {
            state.alert = ""
            state.alertType = ""
            state.deleteAlert = ""
        }
    }
})

export default alertSlice.reducer
export const { setAlert, clearAlert } = alertSlice.actions