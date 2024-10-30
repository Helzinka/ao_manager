<template>
  <i i="ep-shopping-cart" @click="open = true"></i>
  <el-drawer v-model="open" append-to-body="main">
    <h1>Cart</h1>
    <ul>
      <li v-for="cart in cartStore.items" :key="cart">
        {{ cart }}
      </li>
    </ul>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/store/cart.store';
const cartStore = useCartStore();
const open = ref(false);
</script>

<style lang="scss" scoped></style>
