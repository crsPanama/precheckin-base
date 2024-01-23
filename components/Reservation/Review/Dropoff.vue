<script setup>
const { state } = usePrecheckin();
</script>
<template>
  <UiReservationCardChargeDetailContainer
    v-if="state.prices.dropoff"
    title="Drop-Off"
  >
    <template #charge-item>
      <UiReservationCardChargeDetailItem
        title="Dropoff"
        :price="state.prices.dropoff"
      />
    </template>
  </UiReservationCardChargeDetailContainer>
</template>

<style lang="scss" scoped></style>
