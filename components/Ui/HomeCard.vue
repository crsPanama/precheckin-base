<script setup lang="ts">
import type { Alert } from '../../types/types';

interface Props {
  alert: Alert;
  backgroundColor?: string;
  textColor?: string;
}
withDefaults(defineProps<Props>(), {
  backgroundColor: 'white',
  textColor: 'black',
});
</script>
<template>
  <main
    class="h-[60vh] md:h-[80vh] flex flex-col justify-center min-w-[320px] bg-no-repeat bg-center bg-cover"
  >
    <article
      class="mx-4 bg-white rounded p-7 md:p-10 text-center md:flex md:text-left md:py-16 md:max-w-xl md:mx-20 lg:mt-20 lg:mx-0 lg:ml-60"
    >
      <div class="max-md:max-w-[270px] mx-auto">
        <h1 class="text-xl m-0 pb-4 font-bold lg:text-2xl">
          {{ $t('home.title') }}
        </h1>

        <slot name="form" />

        <UiAlertMessage v-if="alert.type" class="pt-3" :type="alert.type">
          {{ alert.message }}
        </UiAlertMessage>
      </div>
    </article>
  </main>
</template>

<style scoped>
article {
  background-color: v-bind(backgroundColor);
  color: v-bind(textColor);
}
</style>
