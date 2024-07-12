import axios from 'axios';
import { useGlobalStore } from '@/store/global.store';

// const serverURL = process.env.VITE_SERVER_URL;

const defaultRegion = 'europe';

export const instanceAxios = axios.create({
  // baseURL: 'https://europe.albion-online-data.com',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.request.use((config: any) => {
  const globalStore = useGlobalStore();
  const region = globalStore.region ? globalStore.region : defaultRegion;
  config.baseURL = `https://${region}.albion-online-data.com`;
  return config;
});
