import { instanceAxios } from '.';

export async function getCurrentItemPrice(item: string) {
  try {
    return await instanceAxios.get(`/api/v2/stats/prices/${item}.json`);
  } catch (error) {
    console.log(error);
  }
}
