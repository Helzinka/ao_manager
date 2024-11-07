<template>
  <div>
    <h1>Todo List des Ressources</h1>
    <ul>
      <li v-for="resource in cartStore.market" :key="resource.name">
        {{ resource.name }}:
        <el-input-number v-model="resource.currentQty"></el-input-number>
        /
        <span>{{ resource.qty }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart.store';
const cartStore = useCartStore();
</script>

<style scoped></style>
