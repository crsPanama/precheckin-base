import type {
  Brands,
  ClientInfo,
  EstimatedTotal,
  PricingInfo,
  ReservationInfo,
} from './../types/precheckin.d';
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
  const { fetchItems } = useDirectusFetch();

  const fetchReservation = async (
    Res: string,
    RentersEmail: string,
    brand: Brands
  ) => {
    const filters: Pick<ClientInfo, 'Renters_Email'> &
      Pick<ReservationInfo, 'Res' | 'marca'> = {
      Res,
      marca: brand,
      Renters_Email: RentersEmail,
    };
    const { data, error } = await fetchItems<
      ClientInfo & ReservationInfo & EstimatedTotal
    >(DB_COLLECTION, {
      filter: filters,
    });
    return {
      data: data && data[0],
      error,
    };
  };

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
    fetchReservation,
  };
};
