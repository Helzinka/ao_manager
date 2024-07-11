import axios from 'axios';

// const serverURL = process.env.VITE_SERVER_URL;

export const instanceAxios = axios.create({
  // baseURL: 'https://europe.albion-online-data.com',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
