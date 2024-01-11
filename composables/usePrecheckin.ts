import { usePrecheckinStore } from '../stores/precheckin';
import type {
  ClientInfo,
  EstimatedTotal,
  ReservationInfo,
} from '../types/precheckin';
import { useDirectusFetch } from './useDirectusFetch';
import type { Sucursal } from 'crs_layer/types/sucursal';
import type { Car } from 'crs_layer/types/car';

const DB_COLLECTION = 'prechecking';

export const usePrecheckin = () => {
  const { fetchItems } = useDirectusFetch();
  const precheckinStore = usePrecheckinStore();
  const { state } = storeToRefs(precheckinStore);

  const setClientInfo = (clientInfo: ClientInfo) => {
    precheckinStore.setClientInfo(clientInfo);
  };
  const setReservationInfo = (reservationInfo: ReservationInfo) => {
    precheckinStore.setReservationInfo(reservationInfo);
  };
  const setEstimatedTotal = (estimatedTotal: number) => {
    precheckinStore.setEstimatedTotal(estimatedTotal);
  };

  const fetchReservation = async (Res: string, RentersEmail: string) => {
    const filters: Pick<ClientInfo, 'Renters_Email'> &
      Pick<ReservationInfo, 'Res'> = {
      Res,
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

  const fetchLocations = async (
    LOCATION_COLLECTION: string,
    sucursal_retiro: string,
    sucursal_retorno: string
  ) => {
    const { data, error } = await fetchItems<Sucursal>(LOCATION_COLLECTION, {
      filter: {
        LocationCode: {
          _in: [sucursal_retiro, sucursal_retorno],
        },
      },
    });
    const pickupLocation =
      data![0].LocationCode === sucursal_retiro ? data![0] : data![1];
    const duebackLocation =
      data![0].LocationCode !== sucursal_retiro ? data![0] : data![1];
    return {
      data: {
        pickupLocation,
        duebackLocation,
      },
      error,
    };
  };

  const fetchCarInfo = async (carClass: string) => {
    const { data } = await fetchItems<Car>('flota', {
      filter: {
        clasificacion: {
          _eq: carClass,
        },
      },
    });
    return {
      car: data![0],
    };
  };

  return {
    state,
    setClientInfo,
    fetchReservation,
    setReservationInfo,
    setEstimatedTotal,
    fetchLocations,
    fetchCarInfo,
    getRebuildedDate: precheckinStore.getRebuildedDate(),
  };
};
