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
  <br />
  <el-table :data="data" border>
    <el-table-column sortable prop="city" label="city" />
    <el-table-column sortable prop="Normal" label="Normal" />
    <el-table-column sortable prop="Good" label="Good" />
    <el-table-column sortable prop="Outstanding" label="Outstanding" />
    <el-table-column sortable prop="Excellent" label="Excellent" />
    <el-table-column sortable prop="Masterpiece" label="Masterpiece" />
  </el-table>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { shopcategories } from '@/data/shopcategories.json';
import dataSource from '@/data/items.json';
import { Search } from '@element-plus/icons-vue';
import { getCurrentItemPrice } from '@/service/price.service';
import mock from '@/data/mock.json';

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
const data = ref();

onMounted(() => {
  // data.value = mock.items;
  data.value = formatPriceDataStructure(mock.items);
});

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

// async function search() {
//   console.log(itemSelected.value);
//   const data = await getCurrentItemPrice(itemSelected.value);
//   console.log(data);
// }

function formatPriceDataStructure(source: any) {
  return source.reduce((acc: any, item: any) => {
    const { city, sell_price_min, quality, sell_price_min_date, item_id } =
      item;
    const index = acc[item_id].findIndex(
      (i: any) => i.city === city && i.item === item_id
    );
    const prices = []
    if (index === -1) {
      prices.push({
        item: item_id,
        city,
        Normal: sell_price_min,
        Normal_date: sell_price_min_date,
        Good: 0,
        Outstanding: 0,
        Excellent: 0,
        Masterpiece: 0,
      });
    } else {
      if (quality === 2) prices['Good'] = sell_price_min;
      prices['Good_date'] = sell_price_min_date;
      if (quality === 3) prices['Outstanding'] = sell_price_min;
      prices['Outstanding_date'] = sell_price_min_date;
      if (quality === 4) prices['Excellent'] = sell_price_min;
      prices['Excellent_date'] = sell_price_min_date;
      if (quality === 5) prices['Masterpiece'] = sell_price_min;
      prices['Masterpiece_date'] = sell_price_min_date;
    }
    return {...acc, {[item_id]: [...prices]}};
  }, {});
}

// console.log(itemsList());
</script>

<style></style>
