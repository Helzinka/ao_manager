<template>
  <div class="flex gap-4 items-end">
    <el-select
      v-model="itemStore.category"
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
      v-model="itemStore.sub_category"
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
      v-model="itemStore.tier"
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
      v-model="itemStore.item"
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
    <el-button
      type="primary"
      plain
      @click="itemStore.getItemPrice()"
      :icon="Search"
    >
      Rechercher
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { shopcategories } from '@/data/shopcategories.json';
import dataSource from '@/data/items.json';
import { Search } from '@element-plus/icons-vue';
import { useItemStore } from '@/store/item.store';
import { ref, computed } from 'vue';

const itemStore = useItemStore();

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
  itemStore.sub_category = '';
  const category = shopcategories.find(
    (category: any) => category.id === itemStore.category
  );
  return category
    ? category.shopsubcategory.map((sub: any) => ({
        value: sub.id,
        label: sub.id,
      }))
    : [];
});

const itemsList = computed(() => {
  itemStore.item = '';

  const data = dataSource.items.equipmentitem.filter(
    (item: any) =>
      item['@shopsubcategory1'] === itemStore.sub_category &&
      item['@tier'] === itemStore.tier
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
