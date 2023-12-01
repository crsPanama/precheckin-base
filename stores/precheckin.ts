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

  const setClientInfo = (values: ClientInfo) => {
    state.value.client_info = values;
  };

  const setReservationInfo = (values: ReservationInfo) => {
    state.value.reservation = values;
  };

  const resetStore = () => {
    state.value = DEFAULT_PRECHECKIN_INFO;
  };

  return {
    state,
    setClientInfo,
    setReservationInfo,
    resetStore,
  };
});
