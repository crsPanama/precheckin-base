import { usePrecheckinStore } from '../stores/precheckin';
import type { ClientInfo, ReservationInfo } from '../types/precheckin';
import { useDirectusFetch } from './useDirectusFetch';

const DB_COLLECTION = 'prechecking';

export const usePrecheckin = () => {
  const { fetchItems } = useDirectusFetch();

  const precheckinStore = usePrecheckinStore();
  const { state } = storeToRefs(precheckinStore);

  const setClientInfo = (clientInfo: ClientInfo) => {
    precheckinStore.setClientInfo(clientInfo);
  };

  const fetchReservation = async (Res: string, RentersEmail: string) => {
    const filters: Pick<ClientInfo, 'Renters_Email'> &
      Pick<ReservationInfo, 'Res'> = {
      Res,
      Renters_Email: RentersEmail,
    };
    const { data, error } = await fetchItems<ClientInfo & ReservationInfo>(
      DB_COLLECTION,
      {
        filter: filters,
      }
    );
    return {
      data: data && data[0],
      error,
    };
  };
  return {
    state,
    setClientInfo,
    fetchReservation,
  };
};
