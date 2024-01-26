import type { Coverage } from 'crs_layer/types/coverage';
import type { Extra } from 'crs_layer/types/extra';
import type { PricingInfo, ReservationInfo } from './../types/precheckin.d';
import type { ReservationUpdateItems } from '../types/precheckin';
// type Item = {
//   prices: PricingInfo;
//   reservationInfo: Pick<ReservationInfo, 'id' | 'status' | 'tipo_pago'>;
//   selectedCoverage: Coverage;
//   extras: Extra[];
// };

export const useReservation = (DB_COLLECTION: string) => {
  const isRequestProcessing = ref<boolean>(false);
  const requestError = ref<string>('');
  const { updateItem } = useDirectusFetch();

  const updateReservationData = async (item: ReservationUpdateItems) => {
    isRequestProcessing.value = true;

    try {
      await updateItem(DB_COLLECTION, item, String(item.id));
    } catch (error) {
      requestError.value = `Error: ${error}`;
    }

    isRequestProcessing.value = false;
  };

  return {
    updateReservationData,
  };
};
