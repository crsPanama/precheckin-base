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
      title="PICK UP"
      :location="pickUpLocation.name"
      :date="reservation.Pickup_Date"
    />
    <UiReservationCardLocationInfoItem
      title="RETURN"
      :location="dueBackLocation.name"
      :date="reservation.Due_Date"
    />
  </div>
</template>

<style scoped></style>
