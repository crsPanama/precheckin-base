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
  const { state, getItemsToUpdate } = storeToRefs(precheckinStore);

  const getReservationUpdateItems = computed(() => {
    return getItemsToUpdate.value;
  });

  const setClientInfo = (clientInfo: ClientInfo) => {
    precheckinStore.setClientInfo(clientInfo);
  };
  const setReservationInfo = (reservationInfo: ReservationInfo) => {
    precheckinStore.setReservationInfo(reservationInfo);
  };
  const setEstimatedTotal = (estimatedTotal: number) => {
    precheckinStore.setEstimatedTotal(estimatedTotal);
  };

  const setDropoff = (dropOff: number = 0) => {
    precheckinStore.setDropOff(dropOff);
  };

  const setEra = (era: number) => {
    precheckinStore.setEra(era);
  };

  const resetStore = () => {
    precheckinStore.resetStore();
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
          //Filter: find locations that matches locationCode name.
          _in: [sucursal_retiro, sucursal_retorno],
        },
      },
    });
    //If locations are equal, backend only return one matching object. Set both location to the returning object
    if (data && data?.length === 0) {
      return {
        data: {
          pickupLocation: data[0],
          duebackLocation: data[0],
        },
      };
    }
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
    getTotalDays: precheckinStore.getTotalDays,
    fetchReservation,
    resetStore,
    getReservationUpdateItems,
    setReservationInfo,
    setEstimatedTotal,
    setDropoff,
    fetchLocations,
    fetchCarInfo,
    setEra,
  };
};
