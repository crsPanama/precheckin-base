import type { Card } from 'crs_layer/types/card';
import type { PaypalInfo } from 'crs_layer/types/paypalInfo';

export const usePayment = (
  paypalInfo: Pick<PaypalInfo, 'custom_id' | 'soft_descriptor'>,
  cardPaymentSecurityKey?: string,
  cardPaymentUrl?: string,
  paypalSecurityKey?: string
) => {
  const {
    card,
    isPaymentProcessing,
    paymentError,
    paymentFullfiled,
    paymentErrorMessage,
    paymentProcess,
    setPaymentErrorMessage,
  } = useCardPayment(cardPaymentSecurityKey, cardPaymentUrl);

  const { generatePaypalBtn, success } = usePaypal();
  const { state, getReservationUpdateItems } = usePrecheckin();
  const { selectedCar } = useCar();
  const { selectedCoverage } = useCoverages();
  const { pickUpLocation, dueBackLocation } = useLocation();
  const { updateReservationData } = useReservation('prechecking');

  const processCardPayment = async (cardValues: Card, params: {}) => {
    card.value = {
      ...cardValues,
    };
    await paymentProcess(params);
    if (paymentError.value) {
      if (paymentError.value.paymentDeclined) {
        setPaymentErrorMessage('Payment Declined');
      }
      if (paymentError.value.paymentServerError) {
        setPaymentErrorMessage('Card Data is not valid');
      }
      setTimeout(() => {
        setPaymentErrorMessage('');
      }, 5000);
    }
  };
  watch(success, async () => {
    if (success.value) {
      updateReservationData({
        ...getReservationUpdateItems.value,
        Dueback_Location_Name: dueBackLocation.name,
        Pickup_Location_Name: pickUpLocation.name,
        status: 'Prechecking Pagado',
        tipo_pago: 'PayPal',
      });
    }
    setTimeout(async () => {
      await navigateTo('success');
    }, 4000);
  });
  onMounted(async () => {
    await generatePaypalBtn(paypalSecurityKey!, {
      amount: {
        value: String(state.value.prices.Total),
      },
      invoice_id: state.value.reservation.Res,
      description: `Renta de auto ${selectedCar.value.modelo} ${selectedCar.value.marca} - ${selectedCoverage.value.nombre} `,
      custom_id: paypalInfo.custom_id + state.value.reservation.Res,
      soft_descriptor: paypalInfo.soft_descriptor,
    });
  });

  return {
    cardPaymentErrorMessage: paymentErrorMessage,
    cardPaymentFullfiled: paymentFullfiled,
    isCardPaymentProcessing: isPaymentProcessing,
    paypalPaymentFullfiled: success,
    processCardPayment,
  };
};
