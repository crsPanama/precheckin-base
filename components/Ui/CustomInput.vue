<script setup lang="ts">
interface Props {
  modelValue: any;
  backgroundColor?: string;
  borderColor?: string;
  focusColor?: string;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  backgroundColor: 'white',
  focusColor: 'rgb(203, 203, 203);',
  borderColor: 'rgba(208, 208, 208, 0.847)',
  errorMessage: '',
});
defineEmits(['update:modelValue']);
</script>
<template>
  <input
    type="text"
    class="rounded-md border-[1px]"
    :class="errorMessage ? 'border-red-500' : 'valid-border-color'"
    v-bind="$attrs"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
  <Transition mode>
    <p v-if="errorMessage.length > 0" class="text-red-500 pt-1 text-sm">
      {{ errorMessage }}
    </p>
  </Transition>
</template>

<style scoped lang="scss">
input {
  background-color: v-bind(backgroundColor);
  background-color: v-bind(backgroundColor);
  transition: background-color 0.5s ease-in;
  transition: border-color 0.2s ease-in;
}
.valid-border-color {
  border-color: v-bind(borderColor);

  &:focus {
    border-color: v-bind(focusColor);
  }
}
</style>
