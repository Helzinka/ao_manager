<template>
  <ItemSelector :search="fetchItemPrice" />
  <br />
  <el-scrollbar>
    <el-row :gutter="20">
      <el-col v-for="item in price.data" :span="12">
        <el-image :src="getImageUrl(item.item)" fit="cover" />
        name : {{ item.name }} tier : {{ item.tier || 0 }}
        <el-table :data="item.data" border class="my-4" table-layout="auto">
          <el-table-column sortable prop="city" label="city" />
          <el-table-column sortable prop="normal" label="Normal" />
          <el-table-column sortable prop="good" label="Good" />
          <el-table-column sortable prop="outstanding" label="Outstanding" />
          <el-table-column sortable prop="excellent" label="Excellent" />
          <el-table-column sortable prop="masterpiece" label="Masterpiece" />
        </el-table>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { usePriceStore } from '@/store/price.store';
import { getImageUrl } from '@/plugins/format';
import { useItemStore } from '@/store/item.store';

const price = usePriceStore();
const item = useItemStore();

function fetchItemPrice() {
  return price.fetchItemPrice(item.itemSelected);
}
</script>

<style></style>
