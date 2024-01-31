<script setup lang="ts">
const { getCoverageTranslatedTitle, selectedCoverage } = useCoverages();
const { selectedLanguage } = useLanguages();
const { calcuatePrices } = usePrices();
const { state } = usePrecheckin();
</script>
<template>
  <UiReservationCardChargeDetailContainer
    :title="$t('reservationBill.coverages')"
  >
    <template #charge-item>
      <Transition>
        <UiReservationCardChargeDetailItem
          v-if="selectedCoverage.id"
          :title="
            getCoverageTranslatedTitle(selectedLanguage, selectedCoverage.id)
          "
          :price="calcuatePrices.coveragePrice"
        />
      </Transition>
      <Transition>
        <UiReservationCardChargeDetailItem
          v-if="state.prices.Era"
          :title="$t('reservationBill.era')"
          :price="calcuatePrices.era"
        />
      </Transition>
    </template>
  </UiReservationCardChargeDetailContainer>
</template>

<style scoped></style>
