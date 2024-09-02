import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    region: 'Europe',
    regionList: ['West', 'East', 'Europe'],
    lang: 'Français',
    langList: {
      Français: 'FR-FR',
      English: 'EN-US',
      Deutsch: 'DE-DE',
      Русский: 'RU-RU',
      Polski: 'PL-PL',
      Español: 'ES-ES',
      Português: 'PT-BR',
      Italiano: 'IT-IT',
      简体中文: 'ZH-CN',
      한국어: 'KO-KR',
      日本語: 'JA-JP',
      繁體中文: 'ZH-TW',
      'Bahasa Indonesia': 'ID-ID',
      Türkçe: 'TR-TR',
      العربية: 'AR-SA',
    },
  }),
  persist: true,
  getters: {
    getRegionList(state) {
      return state.regionList;
    },
    getLangList(state) {
      return state.langList;
    },
  },
  actions: {},
});
