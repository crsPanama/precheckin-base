import { usePrecheckinStore } from '../stores/precheckin';

export const usePrices = () => {
  const precheckinStore = usePrecheckinStore();

  const calcuatePrices = computed(() => {
    return precheckinStore.calculatePrices;
  });

  const setPrices = (
    airportFee: string,
    tax: string,
    total: string,
    subtotal: string
  ) => {
    precheckinStore.setPrices(airportFee, tax, subtotal, total);
  };

  return {
    calcuatePrices,
    setPrices,
  };
};
