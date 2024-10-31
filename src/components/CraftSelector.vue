<template>
  <el-descriptions border>
    <el-descriptions-item label="Craft user" width="80">
      <el-select
        v-model="globalStore.userSelected"
        placeholder="User"
        style="width: 100px"
      >
        <el-option
          v-for="item in getUsers"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="Return rate" align="center">
      <el-input-number
        v-model="craftStore.rrr"
        @change="craftStore.changeReturnRate()"
        size="small"
        controls-position="right"
        :min="0"
        style="width: 100px"
      />
    </el-descriptions-item>
    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { useCraftStore } from '@/store/craft.store';
import { useGlobalStore } from '@/store/global.store';
import { computed } from 'vue';
const craftStore = useCraftStore();
const globalStore = useGlobalStore();

const getUsers = computed(() =>
  globalStore.users.map(user => ({
    value: user,
    label: user,
  }))
);
</script>

<style scoped></style>
