import { defineStore } from 'pinia';
import { craft } from '@/data/mock.json';
import { useItemStore } from './item.store';
import { cost, gain, profit } from '@/helpers/compute';

interface column {
  itemName: string;
  itemPrice: number;
  itemPriceManual: number;
  ressourceName1: string;
  ressourceQty1: number;
  ressourcePrice1: number;
  ressourcePriceManual1: number;
  demand: number;
  profit: number;
  gain: string;
  cost: number;
}

interface state {
  rrr: number;
  cityBonus: boolean;
  row: column[];
}

const state: state = {
  rrr: 24.8,
  cityBonus: true,
  row: [],
};

export const useCraftStore = defineStore('craft', {
  state: () => state,
  getters: {},
  actions: {
    changeReturnRate() {
      this.row.map(col => {
        let ressourcePrice = col.ressourcePriceManual1 || col.ressourcePrice1;
        let itemPrice = col.itemPriceManual || col.itemPrice;
        col.profit = profit(
          itemPrice,
          ressourcePrice,
          col.ressourceQty1,
          this.rrr
        );
        col.gain = gain(
          itemPrice,
          col.ressourcePrice1,
          col.ressourceQty1,
          this.rrr
        );
        col.cost = cost(col.ressourcePrice1, col.ressourceQty1, this.rrr);
      });
    },
    generateTable() {
      const itemStore = useItemStore();
      for (const item of craft.item) {
        let column: column = {
          itemName: item['@uniquename'],
          itemPrice: 0,
          itemPriceManual: 0,
          ressourceName1:
            item.craftingrequirements.craftresource['@uniquename'],
          ressourceQty1: +item.craftingrequirements.craftresource['@count'],
          ressourcePrice1:
            craft.ressourcePrice.find(elem => {
              return (
                item.craftingrequirements.craftresource['@uniquename'] ===
                  elem.item_id && elem.location === itemStore.citySelected
              );
            })?.data[0].avg_price || 0,
          ressourcePriceManual1: 0,
          demand: 0,
          gain: '',
          profit: 0,
          cost: 0,
        };

        let itemFound = craft.priceItem.find(elem => {
          return (
            item['@uniquename'] === elem.item_id &&
            elem.location === itemStore.citySelected
          );
        });
        column.itemPrice = itemFound?.data[0].avg_price || 0;
        column.demand = itemFound?.data[0].item_count || 0;

        column.profit = profit(
          column.itemPrice,
          column.ressourcePrice1,
          column.ressourceQty1,
          this.rrr
        );

        column.gain = gain(
          column.itemPrice,
          column.ressourcePrice1,
          column.ressourceQty1,
          this.rrr
        );

        column.cost = cost(
          column.ressourcePrice1,
          column.ressourceQty1,
          this.rrr
        );

        this.row.push(column);
      }
    },
  },
});
