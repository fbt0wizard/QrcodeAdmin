import { exitUser, updateUserDetails } from "../redux_toolkit/slices/authSlice";

export const app = {
  dbpref: "goh_",
};

// Storage
export const setStorage = (key, value) => {
  if (key && value) {
    localStorage.setItem(app.dbpref + key, value);
  }
};
export const getStorage = (key) => {
  const value = localStorage.getItem(app.dbpref + key);
  return value || "";
};
export const setStorageJson = (key, value) => {
  if (key && value) {
    localStorage.setItem(app.dbpref + key, JSON.stringify(value));
  }
};
export const getStorageJson = (key) => {
  if (key) {
    const value = localStorage.getItem(app.dbpref + key);
    return JSON.parse(value) || [];
  }
};
export const delStorage = (key) => {
  if (key) {
    localStorage.removeItem(app.dbpref + key);
  }
};

// redirect function
export const redirect = (to) => {
  window.location = to;
};

// setting user in on login or page tender

//set userData to Redux toolkit store
export const setUserInfoToStore = (data, dispatch) => {
  dispatch(updateUserDetails(data));
  // redirect("/")
};

// log user out and delete localstorrage item
export const deactivateUser = (dispatch) => {
  delStorage("user");
  delStorage("token");
  // redirect("/login")
  dispatch(exitUser());
};
