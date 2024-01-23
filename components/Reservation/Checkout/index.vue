<script setup lang="ts">
import type { Card } from 'crs_layer/types/card';
interface Props {
  primaryColor: string;
  paymentSecurityKey: string;
  paymentUrl: string;
  paymentExtraParams: {};
}
const props = defineProps<Props>();
const { state } = usePrecheckin();
const {
  card,
  paymentProcess,
  paymentFullfiled,
  paymentError,
  isPaymentProcessing,
  setPaymentErrorMessage,
  paymentErrorMessage,
} = useCardPayment(props.paymentSecurityKey, props.paymentUrl);

const handlePayment = async (cardValues: Card) => {
  card.value = {
    ...cardValues,
  };
  const params = {
    ...props.paymentExtraParams,
    order_id: state.value.reservation.Res,
    first_name: state.value.client_info.Name,
    amount: state.value.prices.Est_Total,
    address1: state.value.reservation.Pickup_Location,
  };

  await paymentProcess(params);

  //Todo: Update reservation on backend after payment is processed correctly
  if (paymentFullfiled.value) {
    console.log(params);
    return;
  }
  if (paymentError.value) {
    if (paymentError.value.paymentDeclined) {
      setPaymentErrorMessage('Payment declined');
    }
    if (paymentError.value.paymentServerError) {
      setPaymentErrorMessage('Card data is not valid, check your information');
    }
    return setTimeout(() => {
      setPaymentErrorMessage('');
    }, 5000);
  }
};
</script>
<template>
  <section class="mx-auto bg-white rounded-md p-4 shadow-md">
    <UiLoadingScreen v-if="isPaymentProcessing" :spinner-color="primaryColor" />
    <!-- <UiModalPaymentResponse /> -->
    <div class="w-11/12 mx-auto">
      <h2 class="font-medium text-xl md:text-2xl">Checkout</h2>
      <!-- CARD PAYMENT -->
      <div class="b my-5 pb-1">
        <h3 class="border-b-[1px] border-gray-400 py-2 font-medium">Card</h3>
        <FormsCheckOutForm
          :primary-color="primaryColor"
          @submit-payment="handlePayment"
        />
        <!-- TODO: Handle error message in case of payment Error -->
        <p v-if="paymentError">{{ paymentErrorMessage }}</p>
      </div>

      <div>
        <h3 class="border-b-[1px] border-gray-400 my-6 pb-1">Otros</h3>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
