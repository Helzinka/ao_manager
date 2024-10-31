<template>
  <el-badge :value="cartStore.totalItems">
    <el-button :icon="ShoppingCart" @click="open = true" />
    <el-drawer size="60%" v-model="open" title="Cart" append-to-body="main">
      <!-- <ul>
        <li v-for="(cart, i) in cartStore.cart" :key="i">
          {{ cart.itemName }}
        </li>
      </ul> -->
      <el-table
        :data="cartStore.cart"
        tyle="width: 100%"
        border
        stripe
        highlight-current-row
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
import { ref } from 'vue';
import { useCartStore } from '@/store/cart.store';
const cartStore = useCartStore();
const open = ref(false);
</script>

<style lang="scss" scoped></style>
