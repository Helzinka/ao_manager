<template>
  <div class="flex gap-4 items-end">
    <el-select
      v-model="catSelected"
      placeholder="Category"
      size="large"
      filterable
      style="width: 140px"
    >
      <template #header>
        <span>Category</span>
      </template>
      <el-option
        v-for="item in categories"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="subSelected"
      filterable
      placeholder="Sub category"
      size="large"
      style="width: 140px"
    >
      <template #header>
        <span>Sub category</span>
      </template>
      <el-option
        v-for="item in subCategory"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="tierSelected"
      placeholder="Tier"
      size="large"
      style="width: 100px"
    >
      <template #header>
        <span>Tier</span>
      </template>
      <el-option
        v-for="tier in tierList"
        :key="tier.value"
        :label="tier.label"
        :value="tier.value"
      />
    </el-select>
    <el-select
      v-model="itemSelected"
      placeholder="Item"
      filterable
      size="large"
      style="width: 240px"
    >
      <template #header>
        <span>Item</span>
      </template>
      <el-option
        v-for="item in itemsList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- <el-button type="primary" plain @click="search" :icon="Search">
      Rechercher
    </el-button> -->
  </div>
</template>

<script setup lang="ts">
import { shopcategories } from '@/data/shopcategories.json';
import dataSource from '@/data/items.json';
import { ref, computed } from 'vue';

const catSelected = ref('');
const subSelected = ref('');
const itemSelected = ref('');
const tierSelected = ref('');
const tierList = ref([
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
]);

const categories = shopcategories.map((category: any) => ({
  value: category.id,
  label: category.id,
}));

const subCategory = computed(() => {
  subSelected.value = '';
  const category = shopcategories.find(
    (category: any) => category.id === catSelected.value
  );
  return category
    ? category.shopsubcategory.map((sub: any) => ({
        value: sub.id,
        label: sub.id,
      }))
    : [];
});

const itemsList = computed(() => {
  itemSelected.value = '';
  const data = dataSource.items.equipmentitem.filter(
    (item: any) =>
      item['@shopsubcategory1'] === subSelected.value &&
      item['@tier'] === tierSelected.value
  );
  return data.length
    ? data.map((item: any) => ({
        value: item['@uniquename'],
        label: item['@uniquename'],
      }))
    : [];
});
</script>

<style scoped></style>
