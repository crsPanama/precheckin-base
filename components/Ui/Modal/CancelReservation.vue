<script setup lang="ts">
const emit = defineEmits(['close', 'proceed']);
defineProps<{ loading: boolean }>();
</script>

<template>
  <UiModal title="Desea cancelar esta reserva?">
    <template #icon>
      <UiIconsWarning class="w-10 h-10 text-orange-500" />
    </template>
    <template #content>
      <div class="flex gap-x-3 mt-4 justify-center">
        <UiBaseButton
          width="100%"
          :disabled="loading"
          class="border-[1px] p-1 disabled:text-gray-500"
          :click-funciton="() => emit('close')"
        >
          Cerrar
        </UiBaseButton>
        <UiBaseButton
          width="100%"
          light-text
          class="border-[1px] p-1 bg-red-500 w-full"
          :click-funciton="() => emit('proceed')"
        >
          <span v-if="!loading">Cancelar</span>
          <LoadingIndicator v-else width="16px" height="16px" color="white" />
        </UiBaseButton>
      </div>
    </template>
  </UiModal>
</template>

<style scoped></style>
