import { createPinia, type Pinia } from 'pinia';

// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

/** Pinia Store */
const pinia: Pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);

export default pinia;
