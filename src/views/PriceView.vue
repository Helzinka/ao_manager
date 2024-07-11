<template>
  <div class="flex gap-4">
    <el-select
      v-model="cat"
      filterable
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in categories"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="sub"
      filterable
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in subCategory"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="item"
      filterable
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in itemsList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" plain>Rechercher</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { shopcategories } from '@/data/shopcategories.json';
import items from '@/data/items.json';
import { getCurrentGold } from '@/service/price.service';

const cat = ref('');
const sub = ref('');
const item = ref('');

onMounted(() => {});

const categories = shopcategories.map((category: any) => ({
  value: category.id,
  label: category.id,
}));

const subCategory = computed(() => {
  sub.value = '';
  const category = shopcategories.find(
    (category: any) => category.id === cat.value
  );
  return category
    ? category.shopsubcategory.map((sub: any) => ({
        value: sub.id,
        label: sub.id,
      }))
    : [];
});

const itemsList = computed(() => {
  item.value = '';
  const data = items.items.equipmentitem.filter(
    (category: any) =>
      category['@shopsubcategory1'] === sub.value && category['@tier'] === '4'
  );
  return data.length
    ? data.map((item: any) => ({
        value: item['@uniquename'],
        label: item['@uniquename'],
      }))
    : [];
});
// console.log(itemsList());
</script>

<style></style>
