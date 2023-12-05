import type {
  ClientInfo,
  PrecheckinInfo,
  ReservationInfo,
} from '../types/precheckin';

const DEFAULT_PRECHECKIN_INFO: PrecheckinInfo = {
  reservation: {
    id: 0,
    status: 'Pendiente de Prechecking',
    Class: '',
    Res: '',
    Pickup_Date: new Date(),
    Pickup_Time: 0,
    Due_Date: new Date(),
    Due_Time: 0,
    tipo_pago: 'tarjeta',
  },
  client_info: {
    Name: '',
    Renters_Email: '',
    Licencia: '',
    Phone_Number: '',
  },
  prices: {
    airport_fee: 0,
    ITBMS: 0,
    subtotal: 0,
    dropoff: 0,
    Est_Total: 0,
    Total: 0,
    Era: 3.99,
  },
};

export const usePrecheckinStore = defineStore('precheckin', () => {
  const state = ref<PrecheckinInfo>(DEFAULT_PRECHECKIN_INFO);

  const setClientInfo = (ClientInfo: ClientInfo) => {
    state.value.client_info = {
      Name: ClientInfo.Name,
      Licencia: ClientInfo.Licencia,
      Phone_Number: ClientInfo.Phone_Number,
      Renters_Email: ClientInfo.Renters_Email,
    };
  };

  const setReservationInfo = (reservationInfo: ReservationInfo) => {
    state.value.reservation = {
      id: reservationInfo.id,
      status: reservationInfo.status,
      Class: reservationInfo.Class,
      Res: reservationInfo.Res,
      Pickup_Date: new Date(reservationInfo.Pickup_Date),
      Pickup_Time: reservationInfo.Pickup_Time,
      Due_Date: new Date(reservationInfo.Due_Date),
      Due_Time: reservationInfo.Due_Time,
      tipo_pago: reservationInfo.tipo_pago,
    };

    state.value.reservation.Pickup_Date.setHours(
      state.value.reservation.Pickup_Time
    );
    state.value.reservation.Due_Date.setHours(state.value.reservation.Due_Time);
  };

  const setEstimatedTotal = (value: number) => {
    state.value.prices.Est_Total = value;
  };

  const resetStore = () => {
    state.value = DEFAULT_PRECHECKIN_INFO;
  };

  return {
    state,
    setClientInfo,
    setReservationInfo,
    resetStore,
    setEstimatedTotal,
  };
});
