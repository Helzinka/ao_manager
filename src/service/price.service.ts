import { instanceAxios } from '.';

export async function getItemPrice(item: string) {
  try {
    const { data } = await instanceAxios.get(
      `/api/v2/stats/prices/${item}.json`
    );
    if (data.length) {
      return data;
    }
    throw new Error('No data found');
  } catch (error) {
    return [];
  }
}
