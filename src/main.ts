import store from '@/store';
import { createApp } from 'vue';

import App from '@/App.vue';
import ElementPlus from '@/plugin/element-plus';
import router from '@/router';

// import { rerollCostByQuality, rerollCost } from '@/plugin/compute';

// console.log('good', rerollCost(8192, 'good', 0));
// console.log('outstanding', rerollCost(8192, 'outstanding', 0));
// console.log(rerollCost(8192, 'good', 0) + rerollCost(8192, 'outstanding', 0));

// console.log(rerollCostByQuality(3008, 1000));
/** Register Vue */
const vue = createApp(App);
vue.use(router);
vue.use(store);
vue.use(ElementPlus);

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));
