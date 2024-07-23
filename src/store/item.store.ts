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
        console.log(this.item);
        this.data = await getItemPrice(this.item);
      }
    },
  },
});
