import type { ReservationInfo } from '../types/precheckin';
import { ReservationStatus } from '../types/enums';

type CancelationStatus = {
  warning: boolean;
  cancelled: boolean;
  error: boolean;
};

const DB_COLLECTION = 'prechecking';

export const useCancelReservation = () => {
  const { updateItem } = useDirectusFetch();
  const { state } = usePrecheckin();
  const loading = ref(false);
  const cancelationStatus = ref<CancelationStatus>({
    warning: false,
    cancelled: false,
    error: false,
  });

  const resetCancelationStatus = () => {
    cancelationStatus.value = {
      warning: false,
      cancelled: false,
      error: false,
    };
  };

  const cancelReservation = async () => {
    loading.value = true;
    try {
      await updateItem<ReservationInfo>(
        DB_COLLECTION,
        { status: ReservationStatus.CANCELED },
        String(state.value.reservation.id)
      );
    } catch (error) {
      cancelationStatus.value.error = true;
      loading.value = false;
      setTimeout(() => {
        resetCancelationStatus();
      }, 4000);
      return;
    }
    cancelationStatus.value = {
      warning: false,
      cancelled: true,
      error: false,
    };
    loading.value = false;
  };

  return {
    cancelationStatus,
    cancelReservation,
    loading,
  };
};
