import type { Card } from 'crs_layer/types/card';

export const usePayment = (
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

  return {
    cardPaymentErrorMessage: paymentErrorMessage,
    cardPaymentFullfiled: paymentFullfiled,
    isCardPaymentProcessing: isPaymentProcessing,
    processCardPayment,
  };
};
