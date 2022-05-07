import { createSlice } from "@reduxjs/toolkit";

export const getStorageJson = (key) => {
    if (key) {
        const value = localStorage.getItem(`goh_${key}`);
        return JSON.parse(value) || [];
    }
}
const user = getStorageJson('user');
const token = localStorage.getItem('goh_token');

const initialState = {
  userDetails: user,
  isLoggedIn: token && user.uuid ? true : false,
  api: true,
};

const userSlice = createSlice({
  name: "TEST",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
        let prevState = {...state.userDetails}
        let condition = Object.keys(prevState).length === 0
      switch (condition) {
        case true:
          state.userDetails = action.payload;
          state.isLoggedIn = true;
          break;
        default:
        //   state.isLoggedIn = true;
      }
    },
    exitUser: (state) => {
      state.isLoggedIn = false;
      state.userDetails = []
    },
  },
});

export default userSlice.reducer;
export const { updateUserDetails, exitUser } = userSlice.actions;
