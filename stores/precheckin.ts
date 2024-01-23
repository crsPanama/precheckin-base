import type {
  ClientInfo,
  PrecheckinInfo,
  ReservationInfo,
} from '../types/precheckin';
import { rebuildReservationDate } from '../utils/rebuildReservationDate';

const DEFAULT_PRECHECKIN_INFO: PrecheckinInfo = {
  reservation: {
    id: 0,
    status: 'Pendiente de Prechecking',
    Class: '',
    Res: '',
    Pickup_Date: new Date(),
    Pickup_Time: 0,
    Pickup_Location: '',
    Due_Date: new Date(),
    Due_Time: 0,
    Due_Back_Location: '',
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
const TAX_VALUE = 7;

export const usePrecheckinStore = defineStore('precheckin', () => {
  const { selectedCoverage } = useCoverages();
  const { selectedCar } = useCar();
  const { selectedExtras } = useExtras();

  const state = ref<PrecheckinInfo>(DEFAULT_PRECHECKIN_INFO);

  const getTotalDays = () => {
    const totalDays = differenceBetweenDays(
      state.value.reservation.Pickup_Date,
      state.value.reservation.Due_Date
    );

    return totalDays;
  };

  const getCarPrice = computed(() => {
    const { pickUpLocation } = useLocation();
    //As car price in this scenario comes already calculated, we need to calculate de airport fee before calculating total SAF
    const carPriceTax = pickUpLocation.impuesto
      ? state.value.prices.Est_Total * (pickUpLocation.impuesto / 100)
      : 0;
    return {
      carPriceTax,
      carPrice: state.value.prices.Est_Total,
    };
  });

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
      Pickup_Date: rebuildReservationDate(
        new Date(reservationInfo.Pickup_Date),
        reservationInfo.Pickup_Time
      ),
      Pickup_Location: reservationInfo.Pickup_Location,
      Pickup_Time: reservationInfo.Pickup_Time,
      Due_Date: rebuildReservationDate(
        new Date(reservationInfo.Due_Date),
        reservationInfo.Due_Time
      ),
      Due_Back_Location: reservationInfo.Due_Back_Location,
      Due_Time: reservationInfo.Due_Time,
      tipo_pago: reservationInfo.tipo_pago,
    };
  };

  const setEra = (era: number) => {
    state.value.prices.Era = era;
  };

  const setEstimatedTotal = (value: number) => {
    state.value.prices.Est_Total = value;
  };

  const setDropOff = (dropoff: number) => {
    state.value.prices.dropoff = dropoff;
  };

  const calculatePrices = computed(() => {
    const { pickUpLocation } = useLocation();
    const totalDias = getTotalDays();
    const carPrices = getCarPrice.value;
    const coveragePrice = precioCobertura(
      selectedCar.value.tipo,
      selectedCoverage.value.precio,
      selectedCoverage.value.precio_2
    );
    const extras =
      selectedExtras.value.length > 0 ? extrasSumados(selectedExtras.value) : 0;
    const airportFee =
      impuestoAeropuerto(
        selectedExtras.value,
        totalDias,
        pickUpLocation.impuesto,
        state.value.prices.dropoff,
        [0]
      ) + carPrices.carPriceTax;

    const subtotal =
      subTotal(
        [state.value.prices.Era, coveragePrice, extras],
        state.value.prices.dropoff,
        totalDias
      ) + Number(carPrices.carPrice);
    const tax = impuesto(subtotal, airportFee, TAX_VALUE);
    const total = subtotal + airportFee + tax;

    return {
      airportFee: airportFee.toFixed(2),
      tax: tax.toFixed(2),
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      coveragePrice: coveragePrice * totalDias,
      era: state.value.prices.Era * totalDias,
    };
  });

  const resetStore = () => {
    state.value = DEFAULT_PRECHECKIN_INFO;
  };

  return {
    state,
    setClientInfo,
    setReservationInfo,
    resetStore,
    setDropOff,
    getTotalDays,
    setEra,
    calculatePrices,
    setEstimatedTotal,
  };
});
