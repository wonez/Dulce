const axios = require('axios');
import store from '../store/config';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use((config) => {

    // // add token
    // config.headers.Authorization = `Bearer ${token}`;
  
    // const state = store.getStore();
    // if(state.auth.user){
    //     console.log(state.auth.user);
    //     config.profile = { 
    //         _id: state.auth.user._id
    //     }
    // }

    return config;
  }, (err) => Promise.reject(err));

module.exports = axiosInstance;
