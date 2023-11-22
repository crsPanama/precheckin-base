<script setup lang="ts">
type alertType = 'error' | 'alert' | '';

defineProps<{ type: alertType }>();
</script>
<template>
  <div
    :class="type === 'error' ? 'text-red-400' : 'text-green-500'"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style scoped></style>
