<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="Last price gold" :value="lastPriceGold" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="Feedback number" :value="562">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import mock from '@/data/mock.json';
import { computed } from 'vue';

const lastPriceGold = computed(() => {
  return mock.gold[mock.gold.length - 1].price;
});
</script>

<style>
.element-plus-logo {
  width: 50%;
}
</style>
