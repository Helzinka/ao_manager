import { getItemPrice } from '@/service/price.service';
import { defineStore } from 'pinia';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    category: '',
    sub_category: '',
    tier: '',
    item: '',
    data: [],
  }),
  getters: {},
  actions: {
    async getItemPrice() {
      if (this.item) {
        const itemsName = this.getAllTierItems();
        this.data = await getItemPrice(itemsName);
      }
    },
    getAllTierItems() {
      let itemsName = [];
      for (let i = 0; i <= 4; i++) {
        if (i == 0) itemsName.push(this.item);
        else itemsName.push(`${this.item}@${i}`);
      }
      return itemsName;
    },
  },
});
