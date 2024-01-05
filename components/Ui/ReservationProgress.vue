<template>
  <div>
    <h1 class="text-base md:text-xl">
      Reservation: <span class="font-bold">K3213123212</span>
    </h1>
  </div>
  <UiProgressBar progress-width="50" :route="route" />
</template>

<script setup lang="ts">
defineProps<{ backgroundColor: string; route: string }>();
</script>

<style lang="scss" scoped></style>
