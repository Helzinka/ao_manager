import { instanceAxios } from '@/service/index';

export async function getCurrentGold(count: number = 2) {
  try {
    return await instanceAxios.get(`/api/v2/stats/gold.json?count=${count}`);
  } catch (error) {
    console.log(error);
  }
}
