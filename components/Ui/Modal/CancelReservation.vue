<script setup lang="ts">
const emit = defineEmits(['close', 'proceed']);
defineProps<{ loading: boolean }>();
</script>

<template>
  <UiModal :title="$t('modals.cancel.title')">
    <template #icon>
      <UiIconsWarning class="w-10 h-10 text-orange-500" />
    </template>
    <template #content>
      <div class="flex gap-x-3 mt-4 w-5/6 mx-auto justify-center">
        <UiBaseButton
          width="100%"
          :disabled="loading"
          class="border-[1px] p-1 disabled:text-gray-500"
          :click-funciton="() => emit('close')"
        >
          {{ $t('modals.cancel.buttons.close') }}
        </UiBaseButton>
        <UiBaseButton
          width="100%"
          light-text
          class="border-[1px] p-1 bg-red-500 w-full"
          :click-funciton="() => emit('proceed')"
        >
          <span v-if="!loading">{{ $t('modals.cancel.buttons.cancel') }}</span>
          <LoadingIndicator v-else width="16px" height="16px" color="white" />
        </UiBaseButton>
      </div>
    </template>
  </UiModal>
</template>

<style scoped></style>
