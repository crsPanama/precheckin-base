<template>
  <div>
    <h1 class="text-base md:text-xl">
      {{ $t('progress.reservation') }}:
      <span class="font-bold">{{ state.reservation.Res }}</span>
    </h1>
  </div>
  <UiProgressBar progress-width="50" :route="route" />
</template>

<script setup lang="ts">
const { state } = usePrecheckin();
defineProps<{ backgroundColor: string; route: string }>();
</script>

<style lang="scss" scoped></style>
