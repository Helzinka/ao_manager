import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    region: 'Europe',
  }),
  actions: {},
});
