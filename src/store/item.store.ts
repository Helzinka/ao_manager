import { defineStore } from 'pinia';
import fake_data from '@/data/mock.json';
import { shopcategories } from '@/data/shopcategories.json';
import source from '@/data/items.json';
import { spreadNumber } from '@/helpers/compute';

interface Istate {
  category: string;
  categorySource: string;
  sub_category: string;
  tierSelected: string;
  tiers: number[];
  itemSelected: string;
  rangeItemsSelected: string[];
}

const state: Istate = {
  category: '',
  categorySource: '',
  sub_category: '',
  tierSelected: '',
  tiers: [1, 2, 3, 4, 5, 6, 7, 8],
  itemSelected: '',
  rangeItemsSelected: [],
};

export const useItemStore = defineStore('item', {
  state: () => state,
  getters: {
    getCategories(state) {
      return shopcategories.map((category: any) => category.id).sort();
    },
    getSubCategory(state) {
      if (!state.category) return [];
      return shopcategories
        .find((category: any) => state.category === category.id)
        ?.shopsubcategory.map((sub: any) => sub.id)
        .sort();
    },
    getTiers(state) {
      return state.tiers;
    },
    getItems(state) {
      if (!state.sub_category && !state.tierSelected) return [];
      return source.items[state.categorySource]
        .filter((item: any) => item['@shopsubcategory1'] === state.sub_category)
        .map((item: any) => item['@uniquename']);
    },
    getAllItems() {
      if (!state.itemSelected) return [];
      let rangeItemsSelected: string[] = [];
      let coreItem = state.itemSelected.replace(/^T\d_/, '');
      for (let i = 4; i <= 8; i++) {
        rangeItemsSelected.push(`T${i}_${coreItem}`);
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
    translateCategoryFromShopToSource() {
      if (!this.category) return '';
      let categorySource = '';
      const weaponCategories = ['melee', 'magic', 'ranged', 'offhand', 'tools'];
      const resourceCategories = [
        'ressources',
        'cityresources',
        'artefacts',
        'essence',
      ];
      const equipmentCategories = ['armor', 'accessories'];

      if (weaponCategories.includes(this.category)) {
        categorySource = 'weapon';
      } else if (this.category === 'consumables') {
        categorySource = 'consumableitem';
      } else if (this.category === 'mounts') {
        categorySource = 'mount';
      } else if (this.category === 'skillbooks') {
        categorySource = 'consumablefrominventoryitem';
      } else if (resourceCategories.includes(this.category)) {
        categorySource = 'simpleitem';
      } else if (equipmentCategories.includes(this.category)) {
        categorySource = 'equipmentitem';
      }
      this.categorySource = categorySource;
    },
  },
});
