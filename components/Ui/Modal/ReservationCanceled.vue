<template>
  <UiModal>
    <template #content>
      <div class="w-11/12 mx-auto md:w-2/3">
        <UiIconsCheck
          class="w-1/2 h-28 mx-auto text-green-600 popup-animation"
        />
        <h3 class="text-center text-xl pt-2 text-animation">
          Reservation canceled
        </h3>
        <div class="w-11/12 mx-auto text-center pt-1 text-animation">
          <h5 class="text-sm mb-2">Redirecting to home page</h5>
          <LoadingIndicator width="24px" height="24px" color="gray" />
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup lang="ts"></script>

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
