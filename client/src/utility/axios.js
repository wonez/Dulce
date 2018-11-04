const axios = require('axios');
import store from '../store/config';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use((config) => {

    // // add token
    // config.headers.Authorization = `Bearer ${token}`;
  
    const state = store.getState();
    
    return config;
  }, (err) => Promise.reject(err));

module.exports = axiosInstance;
