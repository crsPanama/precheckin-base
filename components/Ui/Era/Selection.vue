<script setup lang="ts">
const ERA_VALUE = 3.99;
const ERA_DESCRIPTION =
  'ROAD ASSISTANCE (ERA) This coverage offers THE LESSEE the following roadside assistance services free of charge: Loss of car key, towing service, tire replacement, assistance when running out of battery. The response time by THE LESSOR is subject to the day, time and location of the incident.';
const { setEra, state } = usePrecheckin();

const checkEraIsSelected = computed(() => {
  return state.value.prices.Era === ERA_VALUE;
});

const handleEraSelection = () => {
  if (checkEraIsSelected.value) {
    return setEra(0);
  }
  setEra(ERA_VALUE);
};
</script>
<template>
  <UiChargeContainer :title="$t('optionalCoverage.title')">
    <UiChargeItem
      :title="$t('reservationBill.era')"
      :switch-active="checkEraIsSelected"
      :description="ERA_DESCRIPTION"
      :price="ERA_VALUE"
      border-color="#0365C7"
      @switch-checked="handleEraSelection()"
    />
  </UiChargeContainer>
</template>

<style scoped></style>
