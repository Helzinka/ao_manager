import { instanceAxios } from '.';

export async function getItemPrice(item: string | [string]): Promise<any> {
  try {
    let data = [];
    if (item instanceof Array) {
      data = await instanceAxios.get(
        `/api/v2/stats/prices/${item.join(',')}.json`
      );
    }
    data = await instanceAxios.get(`/api/v2/stats/prices/${item}.json`);
    if (data.length) {
      return data;
    }
    return data;
  } catch (error) {
    throw new Error('No data found');
  }
}
