import { usePrecheckinStore } from '../stores/precheckin';

export const usePrices = () => {
  const precheckinStore = usePrecheckinStore();

  const calcuatePrices = computed(() => {
    return precheckinStore.calculatePrices;
  });

  return {
    calcuatePrices,
  };
};
