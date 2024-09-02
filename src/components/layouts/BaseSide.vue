<template>
  <el-menu
    :collapse="isCollapsed"
    :collapse-transition="full"
    default-active="1"
    class="h-full"
    router
  >
    <el-menu-item index="1" :route="{ name: 'dashboard' }">
      <el-icon><Location /></el-icon>
      <template #title>Home</template>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Money /></el-icon>
        <span>Price</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2" :route="{ name: 'price' }">
          <template #title>Item</template>
        </el-menu-item>
        <el-menu-item index="2-1" :route="{ name: 'ressource' }">
          <template #title>Ressource</template>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="2" :route="{ name: 'craft' }">
      <el-icon><Calendar /></el-icon>
      <template #title>Craft</template>
    </el-menu-item>

    <el-menu-item index="4" :route="{ name: 'parameter' }">
      <el-icon><Setting /></el-icon>
      <template #title>Paramètres</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';

import { Calendar, Setting, Money, Location } from '@element-plus/icons-vue';

const isCollapsed: Ref<boolean> = ref(false);
const full: Ref<boolean> = ref(true);
</script>
