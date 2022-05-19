import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productPag: {
    page: 1,
    totalPage: 1,
    start: 0,
    end: 12,
    for: "product",
    showLoader: false
  },
  userPag: {
    page: 1,
    totalPage: 1,
    start: 0,
    end: 12,
    for: "user",
    showLoader: false,
  },
  qrcodePag: {
    page: 1,
    totalPage: 1,
    start: 0,
    end: 10,
    for: "qrcode",
    showLoader: false
  },
};

const PaginationSlice = createSlice({
  name: "SWITCHER",
  initialState,
  reducers: {
    // seting pagination for products
    setTotalPage: (state, action) => {
      state.productPag.totalPage = action.payload;
    },
    setStart: (state, action) => {
      state.productPag.start = action.payload;
    },
    setPage: (state, action) => {
      state.productPag.page = action.payload;
    },
    setloader: (state, action) => {
      state.productPag.showLoader = action.payload;
    },

    
    // qrcode page function to set pagination
    setqrTotalPage: (state, action) => {
      state.qrcodePag.totalPage = action.payload;
    },
    setqrStart: (state, action) => {
      state.qrcodePag.start = action.payload;
    },
    setqrPage: (state, action) => {
      state.qrcodePag.page = action.payload;
    },
    setqrLoader: (state, action) => {
      state.qrcodePag.showLoader = action.payload;
    },


    // users page pagination controll
    setUserTotalPage: (state, action) => {
      state.userPag.totalPage = action.payload;
    },
    setUserStart: (state, action) => {
      state.userPag.start = action.payload;
    },
    setUserPage: (state, action) => {
      state.userPag.page = action.payload;
    },
    setUserLoader: (state, action) => {
      state.userPag.showLoader = action.payload;
    },
  },
});

export default PaginationSlice.reducer;
export const {
  setStart,
  setTotalPage,
  setEnd,
  setPage,
  setqrStart,
  setqrTotalPage,
  setqrEnd,
  setqrPage,
  setloader,
  setqrLoader,
  setUserLoader,
  setUserPage,
  setUserStart,
  setUserTotalPage,
} = PaginationSlice.actions;
