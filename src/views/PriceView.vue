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
        :key="item['@uniquename']"
        :label="item['@uniquename']"
        :value="item['@uniquename']"
      />
    </el-select>
    <el-button type="primary" plain>Rechercher</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { shopcategories } from '../../data/shopcategories.json';
import items from '../../data/items.json';

const cat = ref('');
const sub = ref('');
const item = ref('');

const categories = shopcategories.map((category: any) => ({
  value: category.id,
  label: category.id,
}));

const subCategory = computed(() => {
  sub.value = '';
  console.log(cat.value);
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
console.log(items.items);
const itemsList = computed(() => {
  return items.items.equipmentitem.filter((category: any) => {
    console.log(category['@shopsubcategory1'], cat.value);
    category['@shopsubcategory1'] === cat.value;
  });
});
</script>

<style></style>
