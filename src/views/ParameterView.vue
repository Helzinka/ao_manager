<template>
  <div>
    <h1>ParameterView</h1>
    <el-button
      @click="
        add({
          itemName: 'item1',
          itemPrice: 10,
          itemRessourceQty: 1,
          itemRessourceType: 'ressource',
        })
      "
    >
      add
    </el-button>
    <div class="flex gap-2 mt-4">
      <el-check-tag
        v-for="item in type"
        :key="item.itemRessourceType"
        :checked="item.checked"
        type="primary"
        @change="toggleTag(item.itemRessourceType)"
      >
        {{ item.itemRessourceType }}
      </el-check-tag>
    </div>
    <el-table :data="filteredData" table-layout="auto">
      <el-table-column prop="itemName" label="name" />
      <el-table-column prop="itemPrice" label="prix" />
      <el-table-column prop="itemRessourceQty" label="quantity" />
      <el-table-column prop="itemRessourceType" label="type" />
    </el-table>
    <el-divider></el-divider>
    <el-table :data="sum" table-layout="auto">
      <el-table-column prop="itemRessourceType" label="type" />
      <el-table-column prop="itemPrice" label="prix" />
      <el-table-column prop="itemCurrentQty" label="current">
        <template #default="scope">
          <el-input-number
            v-model="currentQty[scope.row.itemRessourceType]"
            @input="updateCurrentQty(scope.row.itemRessourceType, $event)"
            :class="{
              'green-text':
                currentQty[scope.row.itemRessourceType] >=
                scope.row.itemRessourceQty,
            }"
          />
        </template>
      </el-table-column>
      <el-table-column prop="itemRessourceQty" label="quantity" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const data = ref([
  {
    itemName: 'item1',
    itemPrice: 10,
    itemRessourceQty: 1,
    itemRessourceType: 'ressource2',
  },
  {
    itemName: 'item2',
    itemPrice: 20,
    itemRessourceQty: 2,
    itemRessourceType: 'ressource2',
  },
  {
    itemName: 'item3',
    itemPrice: 30,
    itemRessourceQty: 3,
    itemRessourceType: 'ressource1',
  },
]);

const add = (item: any) => {
  item.itemRessourceType = `${item.itemRessourceType + Math.ceil(Math.random() * 10)}`;
  data.value.push(item);
};

const currentQty = ref<Record<string, number>>({});

const type = ref(
  [] as {
    itemRessourceType: string;
    checked: boolean;
  }[]
);

const filteredData = computed(() => {
  const checkedTypes = type.value
    .filter(t => t.checked)
    .map(t => t.itemRessourceType);
  if (checkedTypes.length === 0) {
    return data.value;
  }
  return data.value.filter(item =>
    checkedTypes.includes(item.itemRessourceType)
  );
});

const toggleTag = (itemRessourceType: string) => {
  const tag = type.value.find(t => t.itemRessourceType === itemRessourceType);
  if (tag) {
    tag.checked = !tag.checked;
  }
};

const sum = ref([]);

watch(
  filteredData,
  newData => {
    const result = newData.reduce(
      (acc, item) => {
        const { itemRessourceType, itemPrice, itemRessourceQty } = item;
        if (!acc[itemRessourceType]) {
          acc[itemRessourceType] = {
            itemRessourceType,
            itemPrice: 0,
            itemRessourceQty: 0,
            itemCurrentQty: currentQty.value[itemRessourceType] || 0,
          };
        }
        acc[itemRessourceType].itemPrice += itemPrice;
        acc[itemRessourceType].itemRessourceQty += itemRessourceQty;
        return acc;
      },
      {} as Record<
        string,
        {
          itemRessourceType: string;
          itemPrice: number;
          itemRessourceQty: number;
          itemCurrentQty: number;
        }
      >
    );

    sum.value = Object.values(result);
  },
  { immediate: true, deep: true }
);

const updateCurrentQty = (type: string, value: number) => {
  currentQty.value[type] = value;
  console.log('Updated current quantity:', type, value);
};

watch(
  data,
  newData => {
    type.value = newData.reduce(
      (acc, curr) => {
        if (!acc.find(c => c.itemRessourceType === curr.itemRessourceType)) {
          acc.push({
            itemRessourceType: curr.itemRessourceType,
            checked: false,
          });
        }
        return acc;
      },
      [] as {
        itemRessourceType: string;
        checked: boolean;
      }[]
    );
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.green-text {
  color: green;
}
</style>
