<script setup lang="ts">
import clientInfo from '../../schemas/clientInfo';
import type { ClientInfo } from '../../types/precheckin';
const { state, setClientInfo } = usePrecheckin();
const { params } = useRoute();
withDefaults(defineProps<{ primaryColor: string }>(), {
  primaryColor: 'black',
});

defineEmits(['cancel']);

const { setFieldValue, meta, useFieldModel, handleSubmit, errors } = useForm({
  validationSchema: clientInfo,
});
const [Renters_Email, Licencia, Phone_Number, Name] = useFieldModel([
  'Renters_Email',
  'Licencia',
  'Phone_Number',
  'Name',
]);

const onSubmit = handleSubmit(async (values) => {
  setClientInfo(values as ClientInfo);
  await navigateTo(`${params.id}/coverages`);
});

if (state.value.client_info) {
  //Automatically sets input values with fetched data values.
  for (const [key, value] of Object.entries(state.value.client_info)) {
    setFieldValue(key, value);
  }
}
</script>
<template>
  <form
    class="flex flex-col gap-y-4 md:gap-x-3 w-5/6 mx-auto py-5"
    @submit="onSubmit"
  >
    <div>
      <label for="name" class="block mb-2">
        Name <span class="text-red-500">*</span>
      </label>
      <UiCustomInput
        v-model="Name"
        placeholder="Name"
        class="p-2 w-full"
        :focus-color="primaryColor"
        :error-message="errors.Name"
      />
    </div>
    <div>
      <label for="email" class="block mb-2">
        Email <span class="text-red-500">*</span>
      </label>
      <UiCustomInput
        v-model="Renters_Email"
        placeholder="E-mail"
        class="p-2 w-full"
        :focus-color="primaryColor"
        :error-message="errors.Renters_Email && 'Add a valid E-mail'"
      />
    </div>
    <div>
      <label for="email" class="block mb-2">
        License <span class="text-red-500">*</span>
      </label>
      <UiCustomInput
        v-model="Licencia"
        placeholder="Licencia"
        class="p-2 w-full"
        :focus-color="primaryColor"
        :error-message="errors.Licencia && 'This field is required'"
      />
    </div>
    <div>
      <label for="email" class="block mb-2">
        Phone number <span class="text-red-500">*</span>
      </label>
      <UiCustomInput
        v-model="Phone_Number"
        placeholder="Phone number"
        class="p-2 w-full"
        :error-message="errors.Phone_Number && 'Add a valid phone number'"
        :focus-color="primaryColor"
      />
    </div>

    <section class="flex justify-center gap-x-6 w-full py-2">
      <UiBaseButton
        type="button"
        data-test="cancel-btn"
        width="50%"
        class="border-[1px] p-3 border-gray-300 rounded-mdhover:text-white hover:bg-red-500 transition-colors duration-150 hover:text-white"
        :click-funciton="() => $emit('cancel', true)"
      >
        Cancel
      </UiBaseButton>
      <UiBaseButton
        width="50%"
        light-text
        class="border-[1px] border-gray-300 p-3 bg-primary disabled:bg-primary/80 disabled:cursor-not-allowed"
        type="submit"
        :disabled="!meta.valid"
      >
        Next
      </UiBaseButton>
    </section>
  </form>
</template>

<style scoped></style>
