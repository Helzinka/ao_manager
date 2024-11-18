import { defineStore } from 'pinia';
import fake_data from '@/data/mock.json';
import { shopcategories } from '@/data/shopcategories.json';
import { shop } from '@/data/fs/shop.json';
import { spreadNumber } from '@/plugin/compute';

interface Istate {
  category_selected: string;
  categorySource: string;
  sub_category_selected: string;
  tierSelected: string;
  tiers: number[];
  item_selected: string;
  rangeItemsSelected: string[];
}

const state: Istate = {
  category_selected: '',
  categorySource: '',
  sub_category_selected: '',
  tierSelected: '',
  tiers: [1, 2, 3, 4, 5, 6, 7, 8],
  item_selected: '',
  rangeItemsSelected: [],
};

export const useItemStore = defineStore('item', {
  state: () => state,
  getters: {
    getCategories(state) {
      return Object.keys(shop).sort();
    },
    getSubCategory(state) {
      if (!state.category_selected) return [];
      return Object.keys(shop[state.category_selected]).sort();
    },
    getItems(state) {
      if (!state.sub_category_selected) return [];
      return shop[state.category_selected][state.sub_category_selected];
    },
    getAllTierItems() {
      if (!state.item_selected) return [];
      let rangeItemsSelected: string[] = [];
      for (let i = 4; i <= 8; i++) {
        rangeItemsSelected.push(`T${i}_${state.item_selected}`);
      }
      return rangeItemsSelected;
    },
  },
  actions: {
    formatPriceByQuality(data: any) {
      return data.reduce((acc: any, curr: any) => {
        let { city, sell_price_min, quality, item_id } = curr;

        sell_price_min = spreadNumber(sell_price_min);

        if (!acc[item_id]) {
          acc[item_id] = {};
          acc[item_id].item = item_id;
          acc[item_id].name = item_id;
          acc[item_id].tier = curr.item_id.split('@')[1] || 0;
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
