<template>
  <div>
    <el-select
      v-model="globalStore.lang"
      filterable
      title="Lang"
      placeholder="Lang"
      style="width: 120px"
    >
      <el-option
        v-for="region in langList"
        :key="region.value"
        :label="region.label"
        :value="region.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/store/global.store';

const globalStore = useGlobalStore();
const langList = Object.keys(globalStore.getLangList).map(region => ({
  value: region,
  label: region,
}));
</script>

<style lang="scss" scoped></style>
