<template>
  <div class="bg" :style="{ backgroundImage: `url(${bg})` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ bg: string }>();
</script>

<style scoped>
.bg {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
