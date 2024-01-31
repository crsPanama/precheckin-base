<script setup lang="ts">
const {
  state: {
    value: { reservation },
  },
} = usePrecheckin();
const { pickUpLocation, dueBackLocation } = useLocation();
</script>
<template>
  <div
    class="border-y-2 border-primary my-2 py-4 flex justify-center text-center gap-x-3"
  >
    <UiReservationCardLocationInfoItem
      :title="$t('reservationReview.pickup')"
      :location="pickUpLocation.name"
      :date="reservation.Pickup_Date"
    />
    <UiReservationCardLocationInfoItem
      :title="$t('reservationReview.return')"
      :location="dueBackLocation.name"
      :date="reservation.Due_Date"
    />
  </div>
</template>

<style scoped></style>
