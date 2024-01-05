<script setup lang="ts">
defineProps<{ title?: string }>();
</script>
<template>
  <div
    class="fixed w-full h-screen bg-black/50 top-0 flex justify-center items-center"
  >
    <div
      class="bg-white rounded-lg relative w-11/12 md:max-w-md modal py-10 px-5"
    >
      <div class="flex items-center gap-x-2 justify-center">
        <slot name="icon" />
        <h3 v-if="title" class="font-semibold md:text-xl">
          {{ title }}
        </h3>
      </div>
      <slot name="content" />
      <!-- <slot name="action-btns" /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
