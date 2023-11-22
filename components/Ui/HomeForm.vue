<script setup lang="ts">
import { Field, Form, ErrorMessage } from 'vee-validate';
import schema from '../../schemas/homeFormSchema';
interface Props {
  submitFunction: () => void;
}
defineProps<Props>();

const values = ref({
  name: '',
  email: '',
});
</script>
<template>
  <Form
    class="flex flex-col md:flex-row mx-auto w-11/12 gap-y-2 gap-x-2 md:w-full"
    :validation-schema="schema"
    @submit="submitFunction"
  >
    <div class="md:flex md:gap-x-2">
      <div class="w-full max-md:mb-3">
        <Field
          v-model="values.name"
          name="reservation"
          required
          placeholder="Reservation"
          type="text"
          class="bg-gray-100 w-full p-2 border-none input-border"
        />
        <ErrorMessage name="reservation">
          <p class="text-red-500 text-left mt-1 text-xs">
            {{ $t('home.inputErrors.required') }}
          </p>
        </ErrorMessage>
      </div>
      <div class="w-full max-md:mb-3">
        <Field
          v-model="values.email"
          name="email"
          type="email"
          placeholder="E-mail"
          required
          class="w-full p-2 bg-gray-100 border-none input-border"
        />
        <ErrorMessage name="email">
          <p class="text-red-500 text-left mt-1 text-xs">
            {{ $t('home.inputErrors.email') }}
          </p>
        </ErrorMessage>
      </div>
    </div>

    <div class="md:w-1/3 md:ml-auto flex items-start max-md:py-2">
      <UiBaseButton
        type="submit"
        width="100%"
        class="p-2"
        background-color="#047EFF"
        light-text
      >
        {{ $t('home.btnText') }}
      </UiBaseButton>
    </div>
  </Form>
</template>

<style scoped></style>
