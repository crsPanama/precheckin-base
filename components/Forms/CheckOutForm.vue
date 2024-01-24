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
      <label for="card-number" class="pb-5"> Card Number </label>
      <UiCustomInput
        v-model="ccnumber"
        name="card-number"
        placeholder="4111 1111 1111 1111"
        :focus-color="primaryColor"
        :error-message="ccnumberError && 'Add a valid Card Number'"
      />
    </section>
    <section class="md:flex gap-x-5">
      <div class="max-md:pb-4 md:w-1/2">
        <label for="card-exp" class="pb-2"> Expiration Date </label>
        <UiCustomInput
          v-model="ccexp"
          placeholder="10/12"
          name="card-exp"
          :focus-color="primaryColor"
          :error-message="ccexpError && 'Add a valid expiration date'"
        />
      </div>
      <div class="md:w-1/2">
        <label for="card-cvv" class="pb-2"> CVV </label>
        <UiCustomInput
          v-model="cvv"
          placeholder="999"
          :error-message="cvvError && 'Add a valid CVV number'"
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
        Pay
      </UiBaseButton>
    </section>
  </form>
</template>

<style scoped></style>
