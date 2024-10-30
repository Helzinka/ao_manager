<template>
  <el-menu mode="horizontal" router class="justify-between items-center">
    <el-menu-item index="1" :route="{ name: 'dashboard' }">
      AO MANAGER
    </el-menu-item>
    <div class="flex gap-2 items-center">
      <RegionSelector />
      <LangSelector />
      <el-menu-item>
        <CartButton />
      </el-menu-item>
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
