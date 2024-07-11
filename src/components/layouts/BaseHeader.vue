<template>
  <el-menu mode="horizontal" router class="justify-between items-center">
    <el-menu-item index="1" :route="{ name: 'dashboard' }">
      Element Plus
    </el-menu-item>
    <div class="flex items-center">
      <RegionSelector />
      <el-menu-item h="full" @click="toggleDark()">
        <button
          class="w-full cursor-pointer border-none bg-transparent"
          style="height: var(--ep-menu-item-height)"
        >
          <i inline-flex i="dark:ep-moon ep-sunny" />
        </button>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { toggleDark } from '@/helpers/dark';
</script>
