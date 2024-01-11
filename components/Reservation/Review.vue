<script setup lang="ts">
const { selectedCar } = useCar();
const { state } = usePrecheckin();
</script>
<template>
  <article
    class="bg-white border-[1px] border-gray-200 rounded-md w-11/12 mx-auto h-full"
  >
    <div class="bg-primary rounded-t-md py-4 px-3 text-white">
      <h2 class="text-xl">
        {{ selectedCar.marca }} {{ selectedCar.modelo }}
        <span class="text-gray-300">or Similar</span>
      </h2>
    </div>
    <section class="w-4/5 mx-auto max-w-md">
      <UiReservationCardCarInfo
        :img="`https://admin.intermarketing.com.pa/assets/${selectedCar.imagen}`"
      />
      <UiReservationCardLocationInfo />
      <div
        class="flex justify-between text-xl md:text-2xl font-medium py-4 px-5 bg-primary rounded-md text-white my-7"
      >
        <h3>Total:</h3>
        <p>${{ state.prices.Est_Total }}</p>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped></style>
