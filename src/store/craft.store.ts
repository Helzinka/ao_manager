import { defineStore } from 'pinia';
import { craft } from '@/data/mock.json';
import { useItemStore } from './item.store';
import { cost, gain, profit } from '@/helpers/compute';

const state = {
  rrr: 24.8,
  cityBonus: true,

  data: [
    // {
    //   itemName: 'T5_HEAD_CLOTH_SET2',
    //   itemPrice: 1000,
    //   itemPriceManual: 0,
    //   ressourceName1: 'T4_CLOTH',
    //   ressourcePrice1: 20,
    //   ressourceQty1: 8,
    //   ressourcePriceManual1: 0,
    //   demand: 1,
    //   profit: 1,
    //   gain: 1000,
    //   cost: 1,
    //   qty: 1,
    // },
  ],
};

export const useCraftStore = defineStore('craft', {
  state: () => state,
  getters: {},
  actions: {
    applyReturnRate() {
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
        let tempObj = {
          itemName: item['@uniquename'],

          ressourceName1:
            item.craftingrequirements.craftresource['@uniquename'],
          ressourceQty1: item.craftingrequirements.craftresource['@count'],
          ressourcePrice1:
            craft.ressourcePrice.find(elem => {
              return (
                item.craftingrequirements.craftresource['@uniquename'] ===
                  elem.item_id && elem.location === itemStore.citySelected
              );
            })?.data[0].avg_price || 0,
          qty: 0,
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
