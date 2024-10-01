import { formatNumberWithEscape, getTranslate } from '@/plugins/format';
import { getItemPrice } from '@/service/price.service';
import { defineStore } from 'pinia';
import fake_data from '@/data/mock.json';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    category: '',
    sub_category: '',
    tier: '',
    itemSelected: '',
    multiple: false,
    data: [] as any,
  }),
  getters: {},
  actions: {
    async getItemPrice() {
      if (this.itemSelected) {
        // const itemsName = this.getAllTierItems();
        // const result = await getItemPrice(itemsName);
        const result = fake_data.multipleItems;
        if (result.length) {
          this.data = this.formatPriceByQuality(result);
        }
      }
    },
    getAllTierItems() {
      let itemsName = [];
      for (let i = 0; i <= 4; i++) {
        if (i == 0) itemsName.push(this.itemSelected);
        else itemsName.push(`${this.itemSelected}@${i}`);
      }
      return itemsName;
    },
    formatPriceByQuality(data: any) {
      return data.reduce((acc: any, cell: any) => {
        let { city, sell_price_min, quality, item_id } = cell;

        sell_price_min = formatNumberWithEscape(sell_price_min);

        if (!acc[item_id]) {
          acc[item_id] = {};
          acc[item_id].item = item_id;
          // acc[item_id].name = getTranslate(item_id);
          acc[item_id].name = item_id;
          acc[item_id].tier = cell.item_id.split('@')[1] || 0;
          acc[item_id].data = [];
        }

        const index = acc[item_id].data.findIndex((i: any) => i.city === city);

        if (index === -1) {
          acc[item_id].data.push({
            city,
            normal: sell_price_min,
            good: 0,
            outstanding: 0,
            excellent: 0,
            masterpiece: 0,
          });
        } else {
          if (quality === 2) acc[item_id].data[index]['good'] = sell_price_min;
          if (quality === 3)
            acc[item_id].data[index]['outstanding'] = sell_price_min;
          if (quality === 4)
            acc[item_id].data[index]['excellent'] = sell_price_min;
          if (quality === 5)
            acc[item_id].data[index]['masterpiece'] = sell_price_min;
        }
        return acc;
      }, {});
    },
  },
});
