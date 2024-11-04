<template>
  <el-table
    :data="cartStore.cart"
    tyle="width: 100%"
    stripe
    table-layout="auto"
  >
    <!-- item  -->
    <el-table-column prop="itemName" label="name" />
    <!-- compute data -->
    <el-table-column prop="cost" label="Cost" />
    <el-table-column prop="profit" label="Profit" />
    <el-table-column prop="gain" label="Gain" />
    <!-- rrr -->
    <el-table-column prop="rrr" label="Return">
      <template #default="scope">
        <el-input-number
          size="small"
          controls-position="right"
          :min="0"
          v-model="scope.row.rrr"
        />
      </template>
    </el-table-column>
    <!-- qty -->
    <el-table-column prop="qty" label="Qty">
      <template #default="scope">
        <el-input-number
          size="small"
          controls-position="right"
          :min="0"
          v-model="scope.row.qty"
        />
      </template>
    </el-table-column>
    <!-- remove btn -->
    <el-table-column prop="remove" label="Remove">
      <template #default="scope">
        <el-button
          type="danger"
          size="small"
          @click="cartStore.removeItem(scope.row)"
        >
          remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart.store';
const cartStore = useCartStore();
</script>

<style scoped></style>
