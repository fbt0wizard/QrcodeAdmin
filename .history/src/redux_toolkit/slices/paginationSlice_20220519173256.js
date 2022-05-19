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
  //qrcodePag was used for User Transaction history
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
      switch(action.payload.type) {
        case "product":
          state.productPag.totalPage = action.payload;
          break;
          case "user":
            state.userPag.totalPage = action.payload;
            break;
            case "user transaction history":
              state.qrcodePag.totalPage = action.payload;
              break;
              default:
        
      }
    },
    setStart: (state, action) => {
      switch(action.payload.type) {
        case "product":
          state.productPag.start = action.payload;
          break;
          case "user":
            state.userPag.start = action.payload;
            break;
            case "user transaction history":
              state.qrcodePag.start = action.payload;
              break;
              default:
             
      }
    },
    setPage: (state, action) => {
      switch(action.payload.type) {
        case "product":
          state.productPag.page = action.payload;
          break;
          case "user":
            state.userPag.page = action.payload;
            break;
            case "user transaction history":
              state.qrcodePag.page = action.payload;
              break;
              default:
          
      }
    },
    setloader: (state, action) => {
      switch(action.payload.type) {
        case "product":
          state.productPag.showLoader = action.payload;
          break;
          case "user":
            state.userPag.showLoader = action.payload;
            break;
            case "user transaction history":
              state.qrcodePag.showLoader = action.payload;
              break;
              default:
              
      }
      // state.productPag.showLoader = action.payload;
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
