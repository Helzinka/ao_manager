import { defineStore } from 'pinia';
import { craft } from '@/data/mock.json';
import { useItemStore } from './item.store';
import { cost, gain, profit } from '@/helpers/compute';

interface data {
  itemName: string;
  ressourceName1: string;
  ressourceQty1: number;
  ressourcePrice1: number;
  itemPrice: number;
  demand: number;
  profit: number;
  gain: string;
  cost: number;
}

interface state {
  rrr: number;
  cityBonus: boolean;
  data: [data];
}

const state: state = {
  rrr: 24.8,
  cityBonus: true,
  data: [
    {
      itemName: '',
      ressourceName1: '',
      ressourceQty1: 0,
      ressourcePrice1: 0,
      itemPrice: 0,
      demand: 0,
      profit: 0,
      gain: '',
      cost: 0,
    },
  ],
};

export const useCraftStore = defineStore('craft', {
  state: () => state,
  getters: {},
  actions: {
    changeReturnRate() {
      this.data.map(item => {
        item.profit = profit(
          item.itemPrice,
          item.ressourcePrice1,
          item.ressourceQty1,
          this.rrr
        );

        item.gain = gain(
          item.itemPrice,
          item.ressourcePrice1,
          item.ressourceQty1,
          this.rrr
        );

        item.cost = cost(item.ressourcePrice1, item.ressourceQty1, this.rrr);
      });
    },
    generateTable() {
      const itemStore = useItemStore();
      for (const item of craft.item) {
        let tempObj: data = {
          itemPrice: 0,
          itemName: item['@uniquename'],
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
        tempObj.itemPrice = itemFound?.data[0].avg_price || 0;
        tempObj.demand = itemFound?.data[0].item_count || 0;

        tempObj.profit = profit(
          tempObj.itemPrice,
          tempObj.ressourcePrice1,
          tempObj.ressourceQty1,
          this.rrr
        );

        tempObj.gain = gain(
          tempObj.itemPrice,
          tempObj.ressourcePrice1,
          tempObj.ressourceQty1,
          this.rrr
        );

        tempObj.cost = cost(
          tempObj.ressourcePrice1,
          tempObj.ressourceQty1,
          this.rrr
        );

        this.data.push(tempObj);
      }
    },
  },
});
