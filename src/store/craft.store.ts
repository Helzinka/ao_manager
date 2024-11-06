import { defineStore } from 'pinia';
import { craft } from '@/data/mock.json';
import { useItemStore } from './item.store';
import { cost, gain, profit } from '@/helpers/compute';

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
}

interface state {
  rrr: number;
  fee: number;
  cityBonus: boolean;
  craft: items[];
}

const state: state = {
  rrr: 24.8,
  fee: 6.5,
  cityBonus: true,
  craft: [],
};

export const useCraftStore = defineStore('craft', {
  state: () => state,
  getters: {},
  actions: {
    changeReturnRate() {
      this.craft.map(c => {
        let ressourcePrice = c.ressourcePriceManual1 || c.ressourcePrice1;
        let itemPrice = c.itemPriceManual || c.itemPrice;
        c.profit = profit(
          this.rrr,
          this.fee,
          itemPrice,
          ressourcePrice,
          c.ressourceQty1
        );
        c.gain = gain(
          this.rrr,
          this.fee,
          itemPrice,
          c.ressourcePrice1,
          c.ressourceQty1
        );
        c.cost = cost(this.rrr, this.fee, c.ressourcePrice1, c.ressourceQty1);
      });
    },
    generateTable() {
      const itemStore = useItemStore();
      for (const item of craft.item) {
        let tempItem: items = {
          itemName: item['@uniquename'],
          itemPrice: 0,
          itemPriceManual: 0,
          ressourceName1:
            item.craftingrequirements.craftresource['@uniquename'],
          ressourceQty1: +item.craftingrequirements.craftresource['@count'],
          ressourcePrice1:
            craft.ressourcePrice.find(c => {
              return (
                item.craftingrequirements.craftresource['@uniquename'] ===
                  c.item_id && c.location === itemStore.citySelected
              );
            })?.data[0].avg_price || 0,
          ressourcePriceManual1: 0,
          demand: 0,
          gain: 0,
          profit: 0,
          cost: 0,
        };

        let itemFound = craft.priceItem.find(c => {
          return (
            item['@uniquename'] === c.item_id &&
            c.location === itemStore.citySelected
          );
        });
        tempItem.itemPrice = itemFound?.data[0].avg_price || 0;
        tempItem.demand = itemFound?.data[0].item_count || 0;

        tempItem.profit = profit(
          this.rrr,
          this.fee,
          tempItem.itemPrice,
          tempItem.ressourcePrice1,
          tempItem.ressourceQty1
        );

        tempItem.gain = gain(
          this.rrr,
          this.fee,
          tempItem.itemPrice,
          tempItem.ressourcePrice1,
          tempItem.ressourceQty1
        );

        tempItem.cost = cost(
          this.rrr,
          this.fee,
          tempItem.ressourcePrice1,
          tempItem.ressourceQty1
        );

        this.craft.push(tempItem);
      }
    },
  },
});
