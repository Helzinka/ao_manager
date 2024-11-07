<template>
  <div class="flex gap-4 items-end">
    <el-select
      v-model="itemStore.category"
      placeholder="Category"
      size="large"
      filterable
      @change="itemStore.translateCategoryFromShopToSource()"
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
      v-model="itemStore.tierSelected"
      placeholder="Tier"
      size="large"
      style="width: 100px"
    >
      <template #header>
        <span>Tier</span>
      </template>
      <el-option
        v-for="tier in tiers"
        :key="tier.value"
        :label="tier.label"
        :value="tier.value"
      />
    </el-select>
    <el-select
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
    </el-select>
    <el-button type="primary" plain @click="search" :icon="Search">
      Rechercher
    </el-button>
    <slot name="config">
      <el-button
        type="primary"
        plain
        @click="itemStore.showConfig"
        :icon="Setting"
      >
        Config
      </el-button>
    </slot>
  </div>
  <el-divider />
</template>

<script setup lang="ts">
import { Search, Setting } from '@element-plus/icons-vue';
import { useItemStore } from '@/store/item.store';
import { ref, computed } from 'vue';

defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  search: {
    type: Function,
  },
});

const itemStore = useItemStore();

const categories = itemStore.getCategories.map((category: any) => ({
  value: category,
  label: category,
}));

const sub_category = computed(() => {
  return itemStore.getSubCategory?.map((subCategory: any) => ({
    value: subCategory,
    label: subCategory,
  }));
});

const tiers = computed(() => {
  return itemStore.getTiers.map((tier: number) => {
    if (tier === 0) {
      return {
        value: tier,
        label: 'All',
      };
    } else {
      return {
        value: tier,
        label: tier,
      };
    }
  });
});

const items = computed(() => {
  return itemStore.getItems.map((item: any) => ({
    value: item,
    label: item,
  }));
});
</script>

<style scoped></style>
