<template>
  <ItemSelector multiple :search="ok"></ItemSelector>
</template>

<script setup lang="ts">
function ok() {
  console.log('ok');
}
</script>
