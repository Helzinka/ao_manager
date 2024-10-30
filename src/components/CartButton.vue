<template>
  <el-button :icon="Search" />
  <!-- <el-badge :value="12">
    <el-drawer v-model="open" :title="Cart" append-to-body="main">
      <h1>Cart</h1>
      <ul>
        <li v-for="cart in cartStore.items" :key="cart">
          {{ cart }}
        </li>
      </ul>
    </el-drawer>
  </el-badge> -->
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useCartStore } from '@/store/cart.store';
const cartStore = useCartStore();
const open = ref(false);
</script>

<style lang="scss" scoped></style>
