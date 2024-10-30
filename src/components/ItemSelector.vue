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
        v-for="item in sub_category"
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
    <!-- <el-select
      v-model="itemStore.itemSelected"
      placeholder="Item"
      filterable
      size="large"
      style="width: 240px"
    >
      <template #header>
        <span>Item</span>
      </template>
      <el-option
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->
    <el-button type="primary" plain @click="search" :icon="Search">
      Rechercher
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { useItemStore } from '@/store/item.store';
import { ref, computed } from 'vue';

defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  search: {
    type: Promise,
  },
});

const itemStore = useItemStore();
const tierList = ref([
  { value: '0', label: 'all' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
]);

const categories = itemStore.getCategories.map((category: any) => ({
  value: category,
  label: category,
}));

const sub_category = computed(() => {
  return itemStore.getSubCategory?.map((subCategory: any) => ({
    value: subCategory.id,
    label: subCategory.id,
  }));
});

// const items = computed(() => {
//   return itemStore.getItems.map((item: any) => ({
//     value: item['@uniquename'],
//     label: item['@uniquename'],
//   }));
// });
</script>

<style scoped></style>
