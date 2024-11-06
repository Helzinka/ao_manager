<template>
  <ItemSelector></ItemSelector>
  <CraftSelector></CraftSelector>
  <el-divider />
  <el-table
    :data="craftStore.craft"
    tyle="width: 100%"
    stripe
    table-layout="auto"
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
    <el-table-column prop="profit" label="Profit" sortable />
    <el-table-column prop="gain" label="Gain" sortable />
    <el-table-column prop="cost" label="Cost" />
    <!-- qty -->
    <el-table-column prop="add" label="Add">
      <template #default="scope">
        <el-button
          type="primary"
          size="small"
          @click="cartStore.addItem(scope.row, craftStore.rrr)"
        >
          add
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { spreadNumber } from '@/helpers/compute';
import { useCartStore } from '@/store/cart.store';
import { useCraftStore } from '@/store/craft.store';
import { onMounted, toRaw } from 'vue';
const craftStore = useCraftStore();
const cartStore = useCartStore();

onMounted(() => {
  craftStore.generateTable();
});

const formatGain = (row: any) => {
  return row.gain > 0 ? `+ ${row.gain} %` : `${row.gain} %`;
};
</script>

<style scoped></style>
