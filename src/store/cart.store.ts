import { defineStore } from 'pinia';

interface state {
  open: boolean;
  items: string[];
}

const state: state = {
  open: false,
  items: ['ok', 'ok2'],
};

export const useCartStore = defineStore('cart', {
  state: () => state,
  actions: {
    addItem(item: string) {
      this.items.push(item);
    },
    removeItem(index: number) {
      this.items.splice(index, 1);
    },
  },
});
