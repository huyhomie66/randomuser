const axios = require('axios');

const baseURL = `https://randomuser.me`;

const axiosInstance = axios.create({baseURL});

module.exports = axiosInstance;
