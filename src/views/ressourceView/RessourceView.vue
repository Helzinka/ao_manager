<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Ressources" name="first">ok</el-tab-pane>
    <el-tab-pane label="Transformed" name="second">transformed</el-tab-pane>
    <el-tab-pane label="Artefacts" name="third"></el-tab-pane>
    <el-tab-pane label="Runes" name="fourth">
      <RuneView></RuneView>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import RuneView from './RuneView.vue';
import { ref } from 'vue';

const activeName = ref('first');
</script>
