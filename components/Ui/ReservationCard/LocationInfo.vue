<template>
  <div
    class="border-y-2 border-primary my-2 py-4 flex justify-center text-center gap-x-3"
  >
    <UiReservationCardLocationInfoItem
      title="PICK UP"
      location="Tocumen (Aeropuerto Internacional)"
      date="2023 Dec 07, 02:00 PM"
    />
    <UiReservationCardLocationInfoItem
      title="RETURN"
      location="Tocumen (Aeropuerto Internacional)"
      :date="new Date('2023 Dec 07, 02:00 PM')"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
