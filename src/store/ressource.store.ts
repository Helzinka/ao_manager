import { getItemPrice } from '@/service/price.service';
import RuneView from '@/views/ressourceView/RuneView.vue';
import { get } from 'node_modules/axios/index.cjs';
import { defineStore } from 'pinia';

export const useRessourceStore = defineStore('ressourceStore', {
  state: () => ({
    ressource: '',
    rune: [],
    runeList: ""
  }),
  getters: {},
  actions: {
    async fetchRune() {
      const data = getItemPrice('rune');
  },
});
