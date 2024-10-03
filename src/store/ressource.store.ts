import { defineStore } from 'pinia';

export const useRessourceStore = defineStore('ressource', {
  state: () => ({
    ressource: '',
    rune: [],
    runeList: '',
  }),
  getters: {},
  actions: {
    async fetchRune() {},
  },
});
