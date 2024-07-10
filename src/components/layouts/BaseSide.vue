<template>
  <el-menu
    :collapse="isCollapsed"
    :collapse-transition="full"
    default-active="1"
    class="h-full"
    router
  >
    <el-menu-item index="1" :route="{ name: 'price' }">
      <el-icon><Money /></el-icon>
      <template #title>Price</template>
    </el-menu-item>
    <el-menu-item index="2" :route="{ name: 'price' }">
      <el-icon><Calendar /></el-icon>
      <template #title>Evènements</template>
    </el-menu-item>
    <el-menu-item index="3" :route="{ name: 'parameter' }">
      <el-icon><Setting /></el-icon>
      <template #title>Paramètres</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';

import { Calendar, Setting, Money } from '@element-plus/icons-vue';

const isCollapsed: Ref<boolean> = ref(false);
const full: Ref<boolean> = ref(false);
</script>
