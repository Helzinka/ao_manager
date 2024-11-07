<template>
  <el-badge :value="cartLength">
    <el-button :icon="ShoppingCart" @click="open = true" />
    <el-drawer size="60%" v-model="open" title="Cart" append-to-body="main">
      <!-- CartView is a component that displays the cart content -->
      <CartView />
      <template #footer>
        <el-button type="danger" size="small" @click="cartStore.cleanCart()">
          Clean
        </el-button>
      </template>
    </el-drawer>
  </el-badge>
</template>

<script setup>
import { ShoppingCart } from '@element-plus/icons-vue';
import { useCartStore } from '@/store/cart.store';
import CartView from '@/views/cart/index.vue';
import { computed, ref } from 'vue';

const cartStore = useCartStore();
const open = ref(false);

const cartLength = computed(() =>
  cartStore.cartLength ? cartStore.cartLength : ''
);
</script>

<style lang="scss" scoped></style>
