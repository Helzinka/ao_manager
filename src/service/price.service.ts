import { instanceAxios } from '.';

export async function getItemPrice(item: string | string[]): Promise<any> {
  try {
    let url = '';
    if (item instanceof Array)
      url = `/api/v2/stats/prices/${item.join(',')}.json`;
    else url = `/api/v2/stats/prices/${item}.json`;

    const { data } = await instanceAxios.get(url);
    if (data.length) {
      return data;
    }
    throw new Error('No data found');
  } catch (error) {
    console.error(error);
  }
}
