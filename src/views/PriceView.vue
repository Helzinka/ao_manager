<template>
  <ItemSelector />
  <br />
  <!-- <el-table :data="getItemPriceFlat" border>
    <el-table-column sortable prop="city" label="city" />
    <el-table-column sortable prop="Normal" label="Normal" />
    <el-table-column sortable prop="Good" label="Good" />
    <el-table-column sortable prop="Outstanding" label="Outstanding" />
    <el-table-column sortable prop="Excellent" label="Excellent" />
    <el-table-column sortable prop="Masterpiece" label="Masterpiece" />
  </el-table> -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { shopcategories } from '@/data/shopcategories.json';
import dataSource from '@/data/items.json';
import { Search } from '@element-plus/icons-vue';
import { getCurrentItemPrice } from '@/service/price.service';
import mock from '@/data/mock.json';

const data = ref();

onMounted(() => {
  data.value = mock.items;
  // data.value = formatPriceDataStructure(mock.items);
});

// async function search() {
//   console.log(itemSelected.value);
//   const data = await getCurrentItemPrice(itemSelected.value);
//   console.log(data);
// }

// function formatPriceDataStructure(source: any) {
//   return source.reduce((acc: any, item: any) => {
//     const { city, sell_price_min, quality, sell_price_min_date, item_id } =
//       item;
//     const index = acc.findIndex(
//       (i: any) => i.city === city && i.item === item_id
//     );
//     const prices = [];
//     if (index === -1) {
//       prices.push({
//         item: item_id,
//         city,
//         Normal: sell_price_min,
//         Normal_date: sell_price_min_date,
//         Good: 0,
//         Outstanding: 0,
//         Excellent: 0,
//         Masterpiece: 0,
//       });
//     } else {
//       if (quality === 2) prices['Good'] = sell_price_min;
//       prices['Good_date'] = sell_price_min_date;
//       if (quality === 3) prices['Outstanding'] = sell_price_min;
//       prices['Outstanding_date'] = sell_price_min_date;
//       if (quality === 4) prices['Excellent'] = sell_price_min;
//       prices['Excellent_date'] = sell_price_min_date;
//       if (quality === 5) prices['Masterpiece'] = sell_price_min;
//       prices['Masterpiece_date'] = sell_price_min_date;
//     }
//     return prices;
//   }, {});
// }

// console.log(itemsList());
</script>

<style></style>
