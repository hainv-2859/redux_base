import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

axiosClient.interceptors.response.use(
  (response) => response.data || response,
  (error) => Promise.reject(error)
);

export default axiosClient;
