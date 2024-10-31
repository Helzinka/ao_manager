import { defineStore } from 'pinia';

interface state {
  open: boolean;
  cart: string[];
}

const state: state = {
  open: false,
  cart: [],
};

export const useCartStore = defineStore('cart', {
  state: () => state,
  getters: {
    totalItems: state => {
      return state.cart.length ? state.cart.length : '';
    },
  },
  actions: {
    addItem(item: any, rrr: number) {
      item.qty = 1;
      item.rrr = rrr;
      this.cart.push(item);
    },
    removeItem(index: number) {
      this.cart.splice(index, 1);
    },
    cleanCart() {
      this.cart = [];
    },
  },
});
