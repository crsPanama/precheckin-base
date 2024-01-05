<template>
  <div class="py-7 px-3">
    <img :src="img" alt="Car-Image" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ img: string }>();
</script>

<style scoped></style>
