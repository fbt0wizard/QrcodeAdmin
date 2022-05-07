import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    users: [],
    qrAssignedProduct: [],
    qrcode: [],
    transfer: [],
    refetch: false,
};

const dataSlice = createSlice({
    name: 'PRODUCTS',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setQrProducts: (state, action) => {
            state.qrAssignedProduct = action.payload
        },
        updateProducts: (state) => {
            state.refetch = !state.refetch
        },
        updateQrcode: (state, action) => {
            state.qrcode = action.payload
        },
        setTransfer: (state, action) => {
            state.transfer = action.payload
        }
    }
})

export default dataSlice.reducer
export const { setProducts, setUsers, setQrProducts, updateProducts, updateQrcode, setTransfer } = dataSlice.actions