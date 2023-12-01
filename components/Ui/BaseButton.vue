<script setup lang="ts">
interface Props {
  clickFunciton?: () => void;
  width?: string;
  height?: string;
  backgroundColor: string;
  lightText: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  width: '50px',
  lightText: false,
  height: 'fit-content',
  clickFunciton: () => {},
});

const textColor = computed(() => {
  return props.lightText ? 'white' : 'black';
});
</script>
<template>
  <button
    :class="`rounded-md shadow-md ${$attrs.class}`"
    v-bind="$attrs"
    @click="clickFunciton"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  width: v-bind(width);
  height: v-bind(height);
  background-color: v-bind(backgroundColor);
  color: v-bind(textColor);
}
</style>
