<script setup lang="ts">
const { selectedCar } = useCar();
const { state } = usePrecheckin();
</script>
<template>
  <UiReservationCardChargeDetailContainer title="Model">
    <template #charge-item>
      <UiReservationCardChargeDetailItem
        :title="`${selectedCar.marca} ${selectedCar.modelo}`"
        :price="state.prices.Est_Total"
      />
    </template>
  </UiReservationCardChargeDetailContainer>
</template>

<style scoped></style>
