import { instanceAxios } from '@/service/index';

export async function getCurrentGold(count: number = 2) {
  instanceAxios.defaults.baseURL = 'https://europe.albion-online-data.com';
  const data = await instanceAxios.get(
    `/api/v2/stats/gold.json?count=${count}`
  );
}
