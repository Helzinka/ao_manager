import { rateQuantity } from '@/helpers/compute';
import { defineStore } from 'pinia';

interface items {
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
  cart: items[];
  market: any[];
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
      qty: 5,
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
      qty: 10,
      rrr: 24.8,
    },
    {
      itemName: 'T6_SHOES_CLOTH_SET1',
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
      qty: 10,
      rrr: 24.8,
    },
  ],
  market: [],
};

export const useCartStore = defineStore('cart', {
  state: () => state,
  getters: {
    cartLength: state => {
      return state.cart.length;
    },
    getRessrouceQty: state => {
      return state.cart.reduce(
        (acc: { name: string; currentQty: number; qty: number }[], c) => {
          let temp = {
            name: c.ressourceName1,
            currentQty: 0,
            qty: rateQuantity(c.rrr, c.ressourceQty1, c.qty),
          };
          let itemFound = acc.find((c: any) => c.name === temp.name);
          if (itemFound) {
            itemFound.qty += temp.qty;
          } else {
            acc.push(temp);
          }
          return acc;
        },
        []
      );
    },
  },
  actions: {
    addItem(item: any, rrr: number) {
      item.qty = 1;
      item.rrr = rrr;
      this.cart.push({ ...item });
      this.generateTodoList();
    },
    removeItem(index: number) {
      this.cart.splice(index, 1);
    },
    cleanCart() {
      this.cart = [];
    },
    generateTodoList() {
      this.market = this.cart.reduce(
        (acc: { name: string; currentQty: number; qty: number }[], item) => {
          const resource = {
            name: item.ressourceName1,
            currentQty:
              this.market.find(r => r.name === item.ressourceName1)
                ?.currentQty || 0,
            qty: rateQuantity(item.rrr, item.ressourceQty1, item.qty),
          };
          const existingResource = acc.find(r => r.name === resource.name);
          if (existingResource) {
            existingResource.qty += resource.qty;
          } else {
            acc.push(resource);
          }
          return acc;
        },
        []
      );
    },
  },
});
