<template>
  <div>
    <el-select
      v-model="globalStore.region"
      filterable
      title="Region"
      placeholder="Region"
      style="width: 120px"
    >
      <el-option
        v-for="region in regions"
        :key="region.value"
        :label="region.label"
        :value="region.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/store/global.store';

const globalStore = useGlobalStore();
const regions = ref(
  ['West', 'East', 'Europe'].map(region => ({
    value: region,
    label: region,
  }))
);
</script>

<style lang="scss" scoped></style>
