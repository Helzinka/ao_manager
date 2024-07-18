import { defineStore } from 'pinia';

export const useItemSelectorStore = defineStore('itemSelector', {
  state: () => ({
    category: '',
    sub_category: '',
    
  }),
  getters: {
    getRegion(state) {
      return state.region;
    },
  },
  actions: {},
});
