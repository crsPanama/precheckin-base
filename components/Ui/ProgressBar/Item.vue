<template>
  <div class="flex flex-col items-center relative z-50">
    <div
      class="w-8 h-8 rounded-full transition-colors duration-100"
      :class="[active ? 'bg-primary' : 'bg-slate-300']"
    ></div>
    <h3 class="text-xs mt-1 md:text-sm" :class="active && 'font-bold'">
      {{ text }}
    </h3>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hideLine: boolean;
  text: string;
  active: boolean;
}

withDefaults(defineProps<Props>(), {
  hideLine: false,
  active: false,
});
</script>
