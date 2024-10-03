import { formatNumberWithEscape, getTranslate } from '@/plugins/format';
import { defineStore } from 'pinia';
import fake_data from '@/data/mock.json';
import { shopcategories } from '@/data/shopcategories.json';
import source from '@/data/items.json';

interface ItemStoreState {
  category: string;
  sub_category: string;
  tier: string;
  itemSelected: string;
  rangeItems: string[];
  data: any;
}

const state: ItemStoreState = {
  category: '',
  sub_category: '',
  tier: '',
  rangeItems: [],
  itemSelected: '',
  data: [],
};

export const useItemStore = defineStore('item', {
  state: () => state,
  getters: {
    getCategories(state) {
      return shopcategories.map((category: any) => category.id).sort();
    },
    getSubCategory(state) {
      if (!state.category) return [];
      return shopcategories.find(
        (category: any) => state.category === category.id
      )?.shopsubcategory;
    },
    getItems(state) {
      if (!state.sub_category) return [];
      let categoryItem = '';
      const weaponCategories = ['melee', 'magic', 'ranged', 'offhand', 'tools'];
      const resourceCategories = [
        'ressources',
        'cityresources',
        'artefacts',
        'essence',
      ];
      const equipmentCategories = ['armor', 'accessories'];

      if (weaponCategories.includes(state.category)) {
        categoryItem = 'weapon';
      } else if (state.category === 'consumables') {
        categoryItem = 'consumableitem';
      } else if (state.category === 'mounts') {
        categoryItem = 'mount';
      } else if (state.category === 'skillbooks') {
        categoryItem = 'consumablefrominventoryitem';
      } else if (resourceCategories.includes(state.category)) {
        categoryItem = 'simpleitem';
      } else if (equipmentCategories.includes(state.category)) {
        categoryItem = 'equipmentitem';
      }

      return source.items[categoryItem].filter((item: any) => {
        if (state.tier !== '0') {
          return (
            item['@shopsubcategory1'] === state.sub_category &&
            item['@tier'] === state.tier
          );
        }
        return item['@shopsubcategory1'] === state.sub_category;
      });
    },
  },
  actions: {
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
