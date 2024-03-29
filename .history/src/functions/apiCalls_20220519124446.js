import { func } from "./";
import axios from "axios";

export const apnData = (obj) => {
  const body = new FormData();
  for (var p in obj) {
      if (p === 'file') {
          body.append('file[0]', obj[p]);
      } else if (p === 'image') {
          body.append('image[0]', obj[p]);
      } else {
          body.append(p, obj[p]);
      }
  }
  return body;
}


export const setHeader = (file) => {
  var token = func.getStorage("token") || "";
  let header;
  switch (file) {
    case true:
      header = {
        Platform: "admin/0.1.0",
        "goh-access-token": `QShFN8DrPWLGNsJpkHhMHVWcw8eGqPcnfxDgMUL39MIfAGW6pTN8xKn4zRMWLw3r.${token}`,
        processData: false,
        cache: false
      };
      break;
    default:
      header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Platform: "admin/0.1.0",
        "goh-access-token": `QShFN8DrPWLGNsJpkHhMHVWcw8eGqPcnfxDgMUL39MIfAGW6pTN8xKn4zRMWLw3r.${token}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      };
  }
  return header
};

// post function for the entire application

export const post = async (data, endpoint, file=false) => {
  // const baseUrl = process.env.REACT_APP_API;
  const baseUrl = "https://qrcode.gohealthy.ng/";
  const headers = setHeader(file);
  console.log(data)
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: headers,
      body: file ? data : JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log({ error: error });
  }
};



// get function for the entire application

export const get = async (endpoint) => {
  // const baseUrl = process.env.REACT_APP_API;
  const baseUrl = "https://qrcode.gohealthy.ng/";
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
  // const baseUrl = process.env.REACT_APP_API;
  const baseUrl = "https://qrcode.gohealthy.ng/";
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

export const put = async (data, endpoint, file=false) => {
  // const baseUrl = process.env.REACT_APP_API;
  const baseUrl = "https://qrcode.gohealthy.ng/";
  const headers = setHeader(file);
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: headers,
      body: file ? data : JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log({ error: error });
  }
};


// delete function for the entire application

export const deleteData = async (endpoint) => {
  // const baseUrl = process.env.REACT_APP_API;
  const baseUrl = "https://qrcode.gohealthy.ng/";
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

// export const postFile = async (action, data = {}) => {
//   const headers = setHeader(true);
//   const baseUrl = "https://qrcode.gohealthy.ng/";

//   try {
//       let response = await fetch(`${baseUrl}${action}`, {
//           method: 'POST',
//           headers,
//           body: data,
//           cache: false,
//           //  dataType: 'JSON',
//           contentType: false,
//           processData: false,
//       });
//       let responseJson = await response.json();
//       return responseJson;
//   } catch (error) {
//       return { status: 606, result: 'Network request failed', error: error };
//   }
// }