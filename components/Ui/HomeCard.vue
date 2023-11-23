<script setup lang="ts">
type AlertInfo = {
  type: string;
  message: string;
};
interface Props {
  backgroundColor: string;
  textColor: string;
  alertMessage: AlertInfo;
  formValidationSchema: Object;
  submitFuntion: () => void;
}
withDefaults(defineProps<Props>(), {
  backgroundColor: 'white',
});
</script>
<template>
  <main
    class="h-[60vh] md:h-[80vh] flex flex-col justify-center min-w-[320px] bg-no-repeat bg-center bg-cover"
  >
    <article
      class="mx-4 bg-white rounded p-4 text-center md:flex md:text-left md:py-16 md:max-w-xl md:mx-20 lg:mt-20 lg:mx-0 lg:ml-60"
    >
      <div class="max-md:max-w-[270px] mx-auto">
        <h1 class="text-xl m-0 pb-4 font-bold lg:text-2xl">
          {{ $t('home.title') }}
        </h1>
        <UiHomeForm
          :submit-function="submitFuntion"
          :schema="formValidationSchema"
        />
        <UiAlertMessage
          v-if="alertMessage.type"
          class="pt-3"
          :type="alertMessage.type"
        >
          {{ alertMessage.message }}
        </UiAlertMessage>
        <!-- <p
          v-if="alertMessage"
          class="text-sm mt-3"
          :class="
            alertMessage.type === 'error' ? 'text-red-400' : 'text-green-500'
          "
        >
          {{ alertMessage.message }}
        </p> -->
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
