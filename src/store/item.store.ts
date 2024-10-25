import { formatNumberWithEscape, getTranslate } from '@/plugins/format';
import { defineStore } from 'pinia';
import fake_data from '@/data/mock.json';
import { shopcategories } from '@/data/shopcategories.json';
import source from '@/data/items.json';

const state = {
  category: '',
  sub_category: '',
  tier: '',
  citySelected: 'Lymhurst',
  rangeItemsSelected: ['T5_HEAD_CLOTH_SET1', 'T6_HEAD_CLOTH_SET1'] as string[],
  itemSelected: 'T5_HEAD_CLOTH_SET1',
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
    translateCategoryItem(state) {
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
      return categoryItem;
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
    getAllItems() {
      if (this.itemSelected) {
        let coreItem = this.itemSelected.replace(/^T\d_/, '');
        for (let i = 4; i <= 8; i++) {
          this.rangeItemsSelected.push(`T${i}_${coreItem}`);
        }
      }
    },
  },
});
