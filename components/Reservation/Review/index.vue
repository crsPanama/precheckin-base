<script setup lang="ts">
const { selectedCar } = useCar();
withDefaults(defineProps<{ showPriceDetails: boolean; priceTotal: number }>(), {
  showPriceDetails: false,
});
</script>
<template>
  <article
    class="bg-white border-[1px] shadow-xl rounded-md border-gray-200 w-11/12 mx-auto h-full"
  >
    <div class="bg-primary rounded-t-md py-4 px-3 text-white">
      <h2 class="text-xl md:text-2xl">
        {{ selectedCar.marca }} {{ selectedCar.modelo }}
        <span class="text-gray-300">or Similar</span>
      </h2>
    </div>
    <section class="w-4/5 mx-auto max-w-md">
      <UiReservationCardCarInfo
        :img="`https://admin.intermarketing.com.pa/assets/${selectedCar.imagen}`"
      />
      <UiReservationCardLocationInfo />
      <div v-if="showPriceDetails" class="pt-4">
        <h3 class="font-bold md:text-xl mb-4">Reservation Details</h3>
        <ReservationReviewDropoff />
        <ReservationReviewCar />
        <ReservationReviewCoverages />
        <ReservationReviewExtras />
        <ReservationReviewSubtotal />
      </div>
      <div
        class="font-medium bg-primary flex my-5 text-white p-4 text-xl md:text-2xl rounded-md justify-between"
      >
        <h3>Total:</h3>
        <p>${{ priceTotal }}</p>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped></style>
