<template>
  <div>
    <h1>ParameterView</h1>
    <el-table :data="data" table-layout="auto">
      <el-table-column prop="itemName" label="name" />
      <el-table-column prop="itemPrice" label="prix" />
      <el-table-column prop="itemRessourceQty" label="quantity" />
      <el-table-column prop="itemRessourceType" label="type" />
    </el-table>
    <el-divider></el-divider>
    <el-table :data="sum" table-layout="auto">
      <el-table-column prop="itemRessourceType" label="type" />
      <el-table-column prop="itemPrice" label="prix" />
      <el-table-column prop="itemCurrentQty" label="current">
        <template #default="scope">
          <el-input
            v-model="currentQty[scope.row.itemRessourceType]"
            @input="updateCurrentQty(scope.row.itemRessourceType, $event)"
            :class="{
              'green-text':
                scope.row.itemCurrentQty >= scope.row.itemRessourceQty,
            }"
          />
        </template>
      </el-table-column>
      <el-table-column prop="itemRessourceQty" label="quantity" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const data = ref([
  {
    itemName: 'item1',
    itemPrice: 10,
    itemRessourceQty: 1,
    itemRessourceType: 'ressource2',
  },
  {
    itemName: 'item2',
    itemPrice: 20,
    itemRessourceQty: 2,
    itemRessourceType: 'ressource2',
  },
  {
    itemName: 'item3',
    itemPrice: 30,
    itemRessourceQty: 3,
    itemRessourceType: 'ressource1',
  },
]);

const currentQty = ref<Record<string, number>>({});

const sum = computed(() => {
  const result = data.value.reduce(
    (acc, item) => {
      const { itemRessourceType, itemPrice, itemRessourceQty } = item;
      if (!acc[itemRessourceType]) {
        acc[itemRessourceType] = {
          itemRessourceType,
          itemPrice: 0,
          itemRessourceQty: 0,
          itemCurrentQty: currentQty.value[itemRessourceType] || 0,
        };
      }
      acc[itemRessourceType].itemPrice += itemPrice;
      acc[itemRessourceType].itemRessourceQty += itemRessourceQty;
      return acc;
    },
    {} as Record<
      string,
      {
        itemRessourceType: string;
        itemPrice: number;
        itemRessourceQty: number;
        itemCurrentQty: number;
      }
    >
  );

  return Object.values(result);
});

const updateCurrentQty = (type: string, value: number) => {
  currentQty.value[type] = value;
  console.log('Updated current quantity:', type, value);
};
</script>

<style scoped>
.green-text {
  color: red;
}
</style>
