<script setup lang="ts">
import * as yup from 'yup';
/* This regular expression validates that the card expiration date is in the correct format MM/YY */
const expDateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;

const { useFieldModel, handleSubmit, errors } = useForm({
  validationSchema: {
    ccnumber: yup.number().required(),
    ccexp: yup.string().matches(expDateRegex).required(),
    cvv: yup.number().required(),
  },
});
const emit = defineEmits(['submit-payment']);
const [ccnumber, ccexp, cvv] = useFieldModel(['ccnumber', 'ccexp', 'cvv']);

const onSubmit = handleSubmit((cardValues) => {
  emit('submit-payment', cardValues);
});

withDefaults(defineProps<{ primaryColor: string }>(), {
  primaryColor: 'black',
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
        :error-message="errors.ccnumber && 'Add a valid Card Number'"
      />
    </section>
    <section class="flex gap-x-5">
      <div class="w-1/2">
        <label for="card-exp" class="pb-2"> Expiration Date </label>
        <UiCustomInput
          v-model="ccexp"
          placeholder="10/12"
          name="card-exp"
          :focus-color="primaryColor"
          :error-message="errors.ccexp && 'Add a valid expiration date'"
        />
      </div>
      <div class="w-1/2">
        <label for="card-cvv" class="pb-2"> CVV </label>
        <UiCustomInput
          v-model="cvv"
          placeholder="999"
          :error-message="errors.cvv && 'Add a valid CVV number'"
          name="card-cvv"
          :focus-color="primaryColor"
        />
      </div>
    </section>

    <section class="mt-5">
      <UiBaseButton
        type="submit"
        class="bg-primary p-3"
        width="100%"
        light-text
      >
        Process Payment
      </UiBaseButton>
    </section>
  </form>
</template>

<style scoped></style>
