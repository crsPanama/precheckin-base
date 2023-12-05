<script setup lang="ts">
import { AlertTypes } from '../../types/types.d';

defineProps<{ type: AlertTypes }>();
</script>
<template>
  <div
    :class="type === AlertTypes.ERROR ? 'text-red-400' : 'text-green-500'"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style scoped></style>
