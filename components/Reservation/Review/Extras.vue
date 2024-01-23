<script setup lang="ts">
const { selectedExtras } = useExtras();
const { getTotalDays } = usePrecheckin();
</script>
<template>
  <Transition>
    <UiReservationCardChargeDetailContainer
      v-if="selectedExtras.length > 0"
      title="Extras"
    >
      <template #charge-item>
        <TransitionGroup>
          <UiReservationCardChargeDetailItem
            v-for="extra in selectedExtras"
            :key="extra.id"
            :title="extra.nombre"
            :price="extra.precio * getTotalDays()"
          />
        </TransitionGroup>
      </template>
    </UiReservationCardChargeDetailContainer>
  </Transition>
</template>

<style scoped></style>
