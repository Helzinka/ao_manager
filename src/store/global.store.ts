import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    userSelected: 'paul',
    users: ['paul', 'john', 'jane'],
    regionSelected: 'Europe',
    regions: ['West', 'East', 'Europe'],
    langSelected: 'Français',
    langs: {
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
    getRegions(state) {
      return state.regions;
    },
    getLangs(state) {
      return state.langs;
    },
  },
  actions: {},
});
