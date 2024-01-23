<script setup lang="ts">
defineProps<{ title: string }>();
const { calcuatePrices } = usePrices();
</script>
<template>
  <div class="py-2">
    <h4 class="font-bold md:text-lg">{{ title }}</h4>

    <slot name="charge-item" :prices="calcuatePrices" />
  </div>
</template>

<style scoped></style>
