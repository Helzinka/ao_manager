<template>
  <ItemSelector />
  <br />
  <el-table :data="data" border>
    <el-table-column sortable prop="city" label="city" />
    <el-table-column sortable prop="normal" label="Normal" />
    <el-table-column sortable prop="good" label="Good" />
    <el-table-column sortable prop="outstanding" label="Outstanding" />
    <el-table-column sortable prop="excellent" label="Excellent" />
    <el-table-column sortable prop="masterpiece" label="Masterpiece" />
  </el-table>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { shopcategories } from '@/data/shopcategories.json';
import dataSource from '@/data/items.json';
import { Search } from '@element-plus/icons-vue';
import mock from '@/data/mock.json';

const data = ref<any>();
const itemSelected = ref<string>();

onMounted(() => {
  data.value = formatDataPriceStructure(mock.item);
});

function formatDataPriceStructure(source: any) {
  return source.reduce((acc: any, item: any) => {
    const { city, sell_price_min, quality, item_id } = item;
    const index = acc.findIndex(
      (i: any) => i.city === city && i.item_id === item_id
    );
    if (index === -1) {
      acc.push({
        item_id,
        city,
        normal: sell_price_min,
        good: 0,
        outstanding: 0,
        excellent: 0,
        masterpiece: 0,
      });
    } else {
      if (quality === 2) acc[index]['good'] = sell_price_min;
      if (quality === 3) acc[index]['outstanding'] = sell_price_min;
      if (quality === 4) acc[index]['excellent'] = sell_price_min;
      if (quality === 5) acc[index]['masterpiece'] = sell_price_min;
    }
    return acc;
  }, []);
}
</script>

<style></style>
