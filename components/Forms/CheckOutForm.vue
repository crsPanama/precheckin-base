<script setup lang="ts">
import * as yup from 'yup';
/* This regular expression validates that the card expiration date is in the correct format MM/YY */
const expDateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;

withDefaults(defineProps<{ primaryColor: string }>(), {
  primaryColor: 'black',
});
const emit = defineEmits(['submit-payment']);

const { handleSubmit, errors } = useForm({
  validateOnMount: true,
  validationSchema: {
    ccnumber: yup.number().required(),
    ccexp: yup.string().matches(expDateRegex).required(),
    cvv: yup.number().required(),
  },
});
const { value: ccnumber, errorMessage: ccnumberError } = useField('ccnumber');
const { value: ccexp, errorMessage: ccexpError } = useField('ccexp');
const { value: cvv, errorMessage: cvvError } = useField('cvv');

const isFormInvalid = computed(() => {
  return Object.keys(errors.value).length > 0;
});

const onSubmit = handleSubmit((cardValues) => {
  emit('submit-payment', cardValues);
});
</script>
<template>
  <form @submit="onSubmit">
    <section class="py-5">
      <label for="card-number" class="pb-5">
        {{ $t('checkout.card.number.text') }}
      </label>
      <UiCustomInput
        v-model="ccnumber"
        name="card-number"
        placeholder="4111 1111 1111 1111"
        :focus-color="primaryColor"
        :error-message="ccnumberError && $t('checkout.card.number.error')"
      />
    </section>
    <section class="md:flex gap-x-5">
      <div class="max-md:pb-4 md:w-1/2">
        <label for="card-exp" class="pb-2">
          {{ $t('checkout.card.expiration.text') }}
        </label>
        <UiCustomInput
          v-model="ccexp"
          placeholder="10/12"
          name="card-exp"
          :focus-color="primaryColor"
          :error-message="ccexpError && $t('checkout.card.expiration.error')"
        />
      </div>
      <div class="md:w-1/2">
        <label for="card-cvv" class="pb-2"> CVV </label>
        <UiCustomInput
          v-model="cvv"
          placeholder="999"
          :error-message="cvvError && $t('checkout.card.cvv.error')"
          name="card-cvv"
          :focus-color="primaryColor"
        />
      </div>
    </section>

    <section class="mt-5">
      <UiBaseButton
        type="submit"
        class="bg-primary p-3 disabled:bg-primary/75"
        width="100%"
        :disabled="isFormInvalid"
        light-text
      >
        {{ $t('checkout.card.button') }}
      </UiBaseButton>
    </section>
  </form>
</template>

<style scoped></style>
