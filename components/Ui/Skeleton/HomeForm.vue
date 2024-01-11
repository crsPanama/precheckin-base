<template>
  <section
    class="flex flex-col md:flex-row mx-auto w-11/12 gap-y-2 gap-x-2 md:w-full"
  >
    <div class="md:flex w-full md:gap-x-2">
      <div class="w-full max-md:mb-3">
        <UiAnimationPlaceHolder
          width="100%"
          height="100%"
          border-radius="5px"
          class="py-1"
        />
      </div>
      <div class="w-full max-md:mb-3">
        <UiAnimationPlaceHolder
          width="100%"
          height="100%"
          border-radius="5px"
          class="py-1"
        />
      </div>
    </div>
    <div class="md:w-1/3 w-full first-letter:flex items-start max-md:py-2">
      <UiAnimationPlaceHolder
        width="100%"
        height="100%"
        border-radius="5px"
        class="py-1"
      />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
