<script setup lang="ts">
const { calcuatePrices } = usePrices();
</script>
<template>
  <UiReservationCardChargeDetailContainer title="SubTotal">
    <template #charge-item>
      <UiReservationCardChargeDetailItem
        title="Subtotal"
        :price="calcuatePrices.subtotal"
      />
      <UiReservationCardChargeDetailItem
        :title="$t('reservationBill.airport_fee')"
        :price="calcuatePrices.airportFee"
      />
      <UiReservationCardChargeDetailItem
        title="I.T.B.M.S"
        :price="calcuatePrices.tax"
      />
    </template>
  </UiReservationCardChargeDetailContainer>
</template>

<style scoped></style>
