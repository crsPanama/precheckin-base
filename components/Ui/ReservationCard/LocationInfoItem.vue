<script setup lang="ts">
interface Props {
  title: string;
  location: string;
  date: Date;
}
const props = defineProps<Props>();

const formatedDate = computed(() => {
  return fechaFormat(props.date, true);
});
</script>
<template>
  <div class="">
    <h3 class="font-medium">{{ title }}</h3>
    <p class="text-sm">{{ location }}</p>
    <p class="text-sm font-medium">{{ formatedDate }}</p>
  </div>
</template>

<style scoped></style>
