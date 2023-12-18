import type { Car } from 'crs_layer/types/car';
export default defineNuxtRouteMiddleware(async () => {
  const { setSelectedCar } = useCar();
  const { getItems } = useDirectusItems();
  const { state } = usePrecheckin();

  const { data } = await useAsyncData('car', () => {
    return getItems<Car>({
      collection: 'flota',
      params: {
        filter: {
          clasificacion: { _eq: state.value.reservation.Class },
        },
      },
    });
  });
  if (data.value) {
    setSelectedCar(data.value[0]);
  }
});
