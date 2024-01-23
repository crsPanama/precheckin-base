<script setup lang="ts">
defineProps<{ spinnerColor: string }>();
</script>

<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<style>
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.5); /* Add transparency for background */
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #fff;
  border-top-color: v-bind(spinnerColor); /* Customize the spinner color */
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
