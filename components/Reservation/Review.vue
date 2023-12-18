<script setup lang="ts">
const carImg =
  'https://admin.intermarketing.com.pa/assets/4d396ce8-d208-4f34-9bd1-2b9b8b63821c';
</script>
<template>
  <article
    class="bg-white border-[1px] border-gray-200 rounded-md w-11/12 mx-auto"
  >
    <div class="bg-primary rounded-t-md py-4 px-3 text-white">
      <h2 class="text-xl">
        Hyundai Tucson <span class="text-gray-300">or Similar</span>
      </h2>
    </div>
    <section class="w-4/5 mx-auto max-w-md">
      <UiReservationCardCarInfo :img="carImg" />
      <UiReservationCardLocationInfo />
      <div
        class="flex justify-between text-xl md:text-2xl font-medium py-4 px-5 bg-primary rounded-md text-white my-7"
      >
        <h3>Total:</h3>
        <p>$./45</p>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped></style>
