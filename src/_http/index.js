import axios from "axios";

const baseURL = process.env.REACT_APP_API;

async function getHeaders() {
  return { "Content-Type": "application/json" };
}

async function getRequest(url, params = {}) {
  return axios.get(`${baseURL}${url}`, {
    headers: await getHeaders(),
    params,
  });
}

export { getRequest };
