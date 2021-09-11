import axios from 'axios';
// Your API key is: d78b9ec7f77844f295150cc398c5fde4

const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/',
  timeout: 5000,
});

export default axiosInstance;
