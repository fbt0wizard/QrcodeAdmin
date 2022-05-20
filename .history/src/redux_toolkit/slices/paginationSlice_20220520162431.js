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
  //qrcodePag was used for qr page
  qrcodePag: {
    page: 1,
    totalPage: 1,
    start: 0,
    end: 10,
    for: "qrcode",
    showLoader: false
  },
  transferPag: {
    page: 1,
    totalPage: 1,
    start: 0,
    end: 12,
    for: "transfer",
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
          state.productPag.totalPage = action.payload.load;
          break;
          case "user":
            state.userPag.totalPage = action.payload.load;
            break;
            case "qr page":
              state.qrcodePag.totalPage = action.payload.load;
              break;
              case "transfer":
                state.transferPag.totalPage = action.payload.load;
                break;
              default:
        
      }
    },
    setStart: (state, action) => {
      switch(action.payload.type) {
        case "product":
          state.productPag.start = action.payload.load;
          break;
          case "user":
            state.userPag.start = action.payload.load;
            break;
            case "qr page":
              state.qrcodePag.start = action.payload.load;
              break;
              case "transfer":
                state.transferPag.start = action.payload.load;
                break;
              default:
             
      }
    },
    setPage: (state, action) => {
      switch(action.payload.type) {
        case "product":
          state.productPag.page = action.payload.load;
          break;
          case "user":
            state.userPag.page = action.payload.load;
            break;
            case "qr page":
              state.qrcodePag.page = action.payload.load;
              break;
              case "transfer":
                state.transferPag.page = action.payload.load;
                break;
              default:
          
      }
    },
    setloader: (state, action) => {
      switch(action.payload.type) {
        case "product":
          state.productPag.showLoader = action.payload.load;
          break;
          case "user":
            state.userPag.showLoader = action.payload.load;
            break;
            case "qr page":
              state.qrcodePag.showLoader = action.payload.load;
              break;
              case "transfer":
                state.transferPag.showLoader = action.payload.load;
                break;
              default:
              
      }
      // state.productPag.showLoader = action.payload;
    },
  },
});

export default PaginationSlice.reducer;
export const {
  setStart,
  setTotalPage,
  setPage,
  setloader,
} = PaginationSlice.actions;
