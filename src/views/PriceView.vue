<template>
  <ItemSelector />
  <br />
  <el-scrollbar>
    <el-row gutter="20">
      <el-col v-for="item in itemStore.data" span="12">
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
import { ref, computed, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import mock from '@/data/mock.json';
import { useItemStore } from '@/store/item.store';

const itemStore = useItemStore();

onMounted(() => {
  itemStore.getItemPrice();
});
</script>

<style></style>
