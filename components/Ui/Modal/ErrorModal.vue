<script setup lang="ts"></script>
<template>
  <UiModal>
    <template #content>
      <div class="w-11/12 mx-auto md:w-2/3">
        <UiIconsCircleX
          class="w-1/2 h-28 mx-auto text-red-600 popup-animation"
        />
        <h3 class="text-center text-xl pt-2 text-animation">
          An error has ocurred. Please try again later
        </h3>
      </div>
    </template>
  </UiModal>
</template>

<style scoped>
.popup-animation {
  animation: iconAnimation 0.5s ease-in;
}
.text-animation {
  animation: textAnimation 0.5s ease-in;
}

@keyframes iconAnimation {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes textAnimation {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
