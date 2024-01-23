<script setup lang="ts">
defineProps<{ title: string; price: number }>();
</script>
<template>
  <div class="flex my-1 justify-between text-sm md:text-base">
    <p class="w-3/4">{{ title }}</p>
    <p>${{ price }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
