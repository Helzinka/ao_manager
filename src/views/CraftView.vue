<template>
  <ItemSelector></ItemSelector>
  <el-divider />
  <el-input-number
    size="small"
    controls-position="right"
    :min="0"
    v-model="craftStore.rrr"
    @change="craftStore.changeReturnRate()"
  />
  <br />

  <el-table
    :data="craftStore.data"
    tyle="width: 100%"
    border
    stripe
    highlight-current-row
  >
    <!-- item  -->
    <el-table-column label="Item">
      <el-table-column prop="itemName" label="name" />
      <el-table-column prop="itemPrice" label="price" />
      <el-table-column prop="itemPriceManual" label="manual">
        <template #default="scope">
          <el-input-number
            size="small"
            controls-position="right"
            :min="0"
            v-model="scope.row.itemPriceManual"
          />
        </template>
      </el-table-column>
    </el-table-column>
    <!-- ressources -->
    <el-table-column label="Cloth">
      <el-table-column prop="ressourceName1" label="ressource" />
      <el-table-column prop="ressourcePrice1" label="price" />
      <el-table-column prop="ressourcePriceManual1" label="manual">
        <template #default="scope">
          <el-input-number
            size="small"
            controls-position="right"
            :min="0"
            v-model="scope.row.ressourcePriceManual1"
          />
        </template>
      </el-table-column>
    </el-table-column>
    <!-- other -->
    <el-table-column prop="demand" label="Demand" />
    <el-table-column prop="profit" label="Profit" />
    <el-table-column prop="gain" label="Gain" />
    <el-table-column prop="cost" label="Cost" />
    <!-- qty -->
    <el-table-column prop="add" label="Add">
      <template #default="scope">
        <el-button size="small">add</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useCraftStore } from '@/store/craft.store';
import { onMounted, ref } from 'vue';
const craftStore = useCraftStore();

onMounted(() => {
  craftStore.generateTable();
});
</script>

<style scoped></style>
