<script setup lang="ts">
const { getRebuildedDate } = usePrecheckin();
</script>
<template>
  <div
    class="border-y-2 border-primary my-2 py-4 flex justify-center text-center gap-x-3"
  >
    <UiReservationCardLocationInfoItem
      title="PICK UP"
      location="Tocumen (Aeropuerto Internacional)"
      :date="getRebuildedDate.pickupDate"
    />
    <UiReservationCardLocationInfoItem
      title="RETURN"
      location="Tocumen (Aeropuerto Internacional)"
      :date="getRebuildedDate.dueDate"
    />
  </div>
</template>

<style scoped></style>
