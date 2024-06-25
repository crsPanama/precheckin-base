import type {
  ClientInfo,
  PrecheckinInfo,
  ReservationInfo,
  ReservationUpdateItems,
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
    marca: '',
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
  const { selectedCoverage, getCoverageTranslatedTitle } = useCoverages();
  const { selectedLanguage } = useLanguages();
  const { selectedCar } = useCar();
  const { selectedExtras, getExtraTranslated } = useExtras();

  const state = ref<PrecheckinInfo>(DEFAULT_PRECHECKIN_INFO);

  const getTotalDays = () => {
    const totalDays = differenceBetweenDays(
      state.value.reservation.Pickup_Date,
      state.value.reservation.Due_Date
    );

    return totalDays;
  };

  const getItemsToUpdate = computed(
    (): Omit<
      ReservationUpdateItems,
      'status' | 'tipo_pago' | 'Dueback_Location_Name' | 'Pickup_Location_Name'
    > => {
      return {
        ...state.value.prices,
        ...state.value.client_info,
        id: state.value.reservation.id,
        Modelo_Auto: `${selectedCar.value.marca} ${selectedCar.value.modelo}`,
        imagen_auto: selectedCar.value.imagen,
        nombre_cobertura: <string>(
          getCoverageTranslatedTitle(
            selectedLanguage.value,
            selectedCoverage.value.id
          )
        ),
        precio_cobertura: precioCobertura(
          selectedCar.value.tipo,
          selectedCoverage.value.precio,
          selectedCoverage.value.precio_2
        ),
        Coberturas: selectedCoverage.value,
        Extras: selectedExtras.value.map((extra) => {
          return {
            nombre: getExtraTranslated(extra)!.title,
            precio: extra.precio * getTotalDays(),
          };
        }),
      };
    }
  );

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

  /* 
    Not spreading reservationData param because it contains the full reservation data item, setters function
    grabs the values that the store property should get filled with
  */
  const setClientInfo = (reservationData: ClientInfo) => {
    state.value.client_info = {
      Licencia: reservationData.Licencia,
      Name: reservationData.Name,
      Phone_Number: reservationData.Phone_Number,
      Renters_Email: reservationData.Renters_Email,
    };
  };

  const setReservationInfo = (reservationData: ReservationInfo) => {
    state.value.reservation = {
      Class: reservationData.Class,
      Due_Back_Location: reservationData.Due_Back_Location,
      Pickup_Location: reservationData.Pickup_Location,
      id: reservationData.id,
      status: reservationData.status,
      Pickup_Time: reservationData.Pickup_Time,
      Res: reservationData.Res,
      Due_Time: reservationData.Due_Time,
      marca: reservationData.marca,
      tipo_pago: reservationData.tipo_pago,
      Pickup_Date: rebuildReservationDate(
        new Date(reservationData.Pickup_Date),
        reservationData.Pickup_Time
      ),
      Due_Date: rebuildReservationDate(
        new Date(reservationData.Due_Date),
        reservationData.Due_Time
      ),
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

  const setPrices = (
    airportFee: string,
    tax: string,
    subtotal: string,
    total: string
  ) => {
    state.value.prices = {
      ...state.value.prices,
      airport_fee: Number(airportFee),
      ITBMS: Number(tax),
      subtotal: Number(subtotal),
      Total: Number(total),
    };
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
      coveragePrice: (coveragePrice * totalDias).toFixed(2),
      era: (state.value.prices.Era * totalDias).toFixed(2),
    };
  });

  const resetStore = () => {
    state.value = DEFAULT_PRECHECKIN_INFO;
  };

  return {
    state,
    setPrices,
    setClientInfo,
    setReservationInfo,
    resetStore,
    setDropOff,
    getTotalDays,
    setEra,
    getItemsToUpdate,
    calculatePrices,
    setEstimatedTotal,
  };
});
