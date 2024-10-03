import * as service from '@/service/price.service';
import { defineStore } from 'pinia';

export const usePriceStore = defineStore('price', {
  state: () => ({ data: [] as any }),
  getters: {},
  actions: {
    async fetchItemPrice(item: string | string[]) {
      this.data = await service.fetchItemPrice(item);
    },
  },
});
