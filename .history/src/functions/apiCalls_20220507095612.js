import { func } from "./";
import axios from "axios";

const setHeader = () => {
  var token = func.getStorage("token") || "";
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Platform: process.env.REACT_APP_PLATFORM,
    Platform: "admin/0.1.0",
    // "goh-access-token": `${process.env.REACT_APP_KEY}.${token}`,
    "goh-access-token": `QShFN8DrPWLGNsJpkHhMHVWcw8eGqPcnfxDgMUL39MIfAGW6pTN8xKn4zRMWLw3r.${token}`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": 0
  };
};

// post function for the entire application

export const post = async (data, endpoint) => {
  const baseUrl = process.env.REACT_APP_API;
  const baseUrl = process.env.REACT_APP_API;
  const headers = setHeader();
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log({ error: error });
  }
};

// get function for the entire application

export const get = async (endpoint, qr = false) => {
  const baseUrl = process.env.REACT_APP_API;
  const headers = setHeader();
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log({ error: error });
  }
};

// axios get function for api calls with optional parameters
export const axiosGet = async (endpoint, data = {}, empty = false) => {

  const baseUrl = process.env.REACT_APP_API;
  let headers = setHeader();
  let url = empty === false ? `${baseUrl}${endpoint}` : endpoint;
  return axios({
    method: "GET",
    url,
    headers: empty ? {} : headers,
    params: data,
  })
    .then((response) => {
      const res = response;
      return res;
    })
    .catch((error) => {
      return { status: 606, result: "Network request failed", error };
    });
};

// put function for the entire application

export const put = async (data, endpoint) => {
  const baseUrl = process.env.REACT_APP_API;
  const headers = setHeader();
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log({ error: error });
  }
};

// delete function for the entire application

export const deleteData = async (endpoint) => {
  const baseUrl = process.env.REACT_APP_API;
  const headers = setHeader();
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log({ error: error });
  }
};
