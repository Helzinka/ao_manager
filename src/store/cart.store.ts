import { defineStore } from 'pinia';

interface item {
  itemName: string;
  itemPrice: number;
  itemPriceManual: number;
  ressourceName1: string;
  ressourceQty1: number;
  ressourcePrice1: number;
  ressourcePriceManual1: number;
  demand: number;
  profit: number;
  gain: number;
  cost: number;
  qty: number;
  rrr: number;
}

interface state {
  open: boolean;
  cart: item[];
}

const state: state = {
  open: false,
  cart: [
    {
      itemName: 'T5_HEAD_CLOTH_SET1',
      itemPrice: 0,
      itemPriceManual: 0,
      ressourceName1: 'T5_CLOTH',
      ressourceQty1: 8,
      ressourcePrice1: 629,
      ressourcePriceManual1: 0,
      demand: 0,
      gain: 0,
      profit: 0,
      cost: 3784,
      qty: 1,
      rrr: 24.8,
    },
    {
      itemName: 'T6_HEAD_CLOTH_SET1',
      itemPrice: 31194,
      itemPriceManual: 0,
      ressourceName1: 'T6_CLOTH',
      ressourceQty1: 8,
      ressourcePrice1: 3670,
      ressourcePriceManual1: 0,
      demand: 46,
      gain: 29,
      profit: 9115,
      cost: 22079,
      qty: 1,
      rrr: 24.8,
    },
  ],
};

export const useCartStore = defineStore('cart', {
  state: () => state,
  getters: {
    cartLength: state => {
      return state.cart.length;
    },
    getRessrouceQty: state => {
      return state.cart.reduce((acc: { name: string; qty: number }[], item) => {
        let state = {
          name: item.ressourceName1,
          qty: item.ressourceQty1 * item.qty,
        };
        let itemFound = acc.find((el: any) => el.name === state.name);
        if (itemFound) {
          itemFound.qty += state.qty;
        } else {
          acc.push(state);
        }
        return acc;
      }, []);
    },
  },
  actions: {
    addItem(item: any, rrr: number) {
      item.qty = 1;
      item.rrr = rrr;
      this.cart.push({ ...item });
    },
    removeItem(index: number) {
      this.cart.splice(index, 1);
    },
    cleanCart() {
      this.cart = [];
    },
  },
});
