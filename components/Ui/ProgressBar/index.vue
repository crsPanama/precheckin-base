<script setup lang="ts">
import { ProcessRoutes } from '../../../types/types.d';
type activeRoutes = {
  coverages: boolean;
  extras: boolean;
  checkout: boolean;
};
const props = defineProps<{ route: string; backgroundColor: string }>();
const progressWidth = ref<string>('0%');
const activeRoutes = ref<activeRoutes>({
  coverages: false,
  extras: false,
  checkout: false,
});

const checkRoute = () => {
  activeRoutes.value = {
    coverages: true,
    extras:
      props.route === ProcessRoutes.EXTRAS ||
      props.route === ProcessRoutes.CHECKOUT,
    checkout: props.route === ProcessRoutes.CHECKOUT,
  };
};

watch(
  () => activeRoutes.value,
  () => {
    if (activeRoutes.value.coverages) {
      progressWidth.value = '0%';
    }
    if (activeRoutes.value.extras) {
      progressWidth.value = '50%';
    }
    if (activeRoutes.value.checkout) {
      progressWidth.value = '100%';
    }
  }
);
watch(
  () => props.route,
  () => {
    checkRoute();
  }
);
</script>
<template>
  <div
    class="flex justify-around items-center max-w-lg mx-auto my-5 relative progress-bar"
  >
    <UiProgressBarItem text="Coverages" active-background="bg-red-500" active />
    <UiProgressBarItem
      text="Extras"
      :active="activeRoutes.extras || activeRoutes.checkout"
      :active-background="backgroundColor"
    />
    <UiProgressBarItem
      text="Checkout"
      hide-line
      :active="activeRoutes.checkout"
      :active-background="backgroundColor"
    />
    <div class="w-2/3 h-2 bg-slate-300 absolute top-1/3 -translate-y-1/2">
      <div
        class="progress-width h-2 absolute transition-all duration-200 ease-out bg-primary"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-width {
  width: v-bind(progressWidth);
}
</style>
