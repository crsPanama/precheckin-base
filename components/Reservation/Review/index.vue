<script setup lang="ts">
const { selectedCar } = useCar();
enum Themes {
  light = 'light',
  dark = 'dark',
}

withDefaults(
  defineProps<{
    showPriceDetails: boolean;
    priceTotal: number;
    textTheme: 'dark' | 'light';
  }>(),
  {
    showPriceDetails: false,
    textTheme: Themes.light,
  }
);
</script>
<template>
  <article
    class="bg-white border-[1px] shadow-xl rounded-md border-gray-200 w-11/12 mx-auto h-full font-medium"
    :class="textTheme === Themes.light ? 'text-white' : 'text-black'"
  >
    <div class="bg-primary rounded-t-md py-4 px-3">
      <h2 class="text-xl md:text-2xl">
        {{ selectedCar.marca }} {{ selectedCar.modelo }}
        <span
          :class="
            textTheme === Themes.light ? 'text-gray-300' : 'text-black/60'
          "
        >
          {{ $t('reservationReview.similar') }}
        </span>
      </h2>
    </div>
    <section class="w-4/5 mx-auto max-w-md">
      <UiReservationCardCarInfo
        :img="`https://admin.intermarketing.com.pa/assets/${selectedCar.imagen}`"
      />
      <UiReservationCardLocationInfo class="text-black" />
      <div v-if="showPriceDetails" class="pt-4 text-black">
        <h3 class="font-bold md:text-xl mb-4">
          {{ $t('reservationBill.title') }}
        </h3>
        <ReservationReviewDropoff />
        <ReservationReviewCar />
        <ReservationReviewCoverages />
        <ReservationReviewExtras />
        <ReservationReviewSubtotal />
      </div>
      <div
        class="font-medium bg-primary flex my-5 p-4 text-xl md:text-2xl rounded-md justify-between"
      >
        <h3>Total:</h3>
        <p>${{ priceTotal }}</p>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped></style>
