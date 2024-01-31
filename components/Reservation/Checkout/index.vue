<script setup lang="ts">
import type { Card } from 'crs_layer/types/card';
import type { PaypalInfo } from 'crs_layer/types/paypalInfo';

interface Props {
  primaryColor: string;
  paymentSecurityKey: string;
  paypalSecurityKey: string;
  paypalInfo: Pick<PaypalInfo, 'custom_id' | 'soft_descriptor'>;
  paymentUrl: string;
  paymentExtraParams: {};
}
const props = defineProps<Props>();

const { state, getReservationUpdateItems } = usePrecheckin();
const { updateReservationData } = useReservation('prechecking');
const {
  processCardPayment,
  cardPaymentErrorMessage,
  cardPaymentFullfiled,
  isCardPaymentProcessing,
  paypalPaymentFullfiled,
} = usePayment(
  props.paypalInfo,
  props.paymentSecurityKey,
  props.paymentUrl,
  props.paypalSecurityKey
);

const handlePayment = async (cardValues: Card) => {
  const params = {
    ...props.paymentExtraParams,
    order_id: state.value.reservation.Res,
    first_name: state.value.client_info.Name,
    amount: state.value.prices.Total,
    address1: state.value.reservation.Pickup_Location,
  };

  await processCardPayment(cardValues, params);

  if (cardPaymentFullfiled) {
    await updateReservationData({
      ...getReservationUpdateItems.value,
      status: 'Prechecking Pagado',
      tipo_pago: 'tarjeta',
    });
    setTimeout(async () => {
      cardPaymentFullfiled.value = false;
      await navigateTo('success');
    }, 4000);
  }
};
</script>
<template>
  <section class="mx-auto bg-white rounded-md p-4 shadow-md relative">
    <UiLoadingScreen
      v-if="isCardPaymentProcessing"
      :spinner-color="primaryColor"
    />
    <div class="w-11/12 mx-auto">
      <h2 class="font-medium text-xl md:text-2xl">Checkout</h2>
      <!-- CARD PAYMENT -->
      <div class="b my-5 pb-1">
        <h3 class="border-b-[1px] border-gray-400 py-2 font-medium">
          {{ $t('checkout.card.title') }}
        </h3>
        <FormsCheckOutForm
          :primary-color="primaryColor"
          @submit-payment="handlePayment"
        />
        <Transition>
          <p
            v-if="cardPaymentErrorMessage"
            class="py-3 text-center text-red-500"
          >
            {{ cardPaymentErrorMessage }}
          </p>
        </Transition>
      </div>
      <div class="fixed left-0 z-50">
        <UiModalConfirmModal
          v-if="cardPaymentFullfiled || paypalPaymentFullfiled"
          :title="$t('modals.paymentSuccess.title')"
          :sub-title="$t('modals.paymentSuccess.subtitle')"
        />
      </div>
      <div>
        <h3 class="border-b-[1px] border-gray-400 my-6 pb-1">
          {{ $t('checkout.others.title') }}
        </h3>

        <div class="py-5 relative z-40">
          <div id="paypal-button"></div>
        </div>
      </div>
      <div>
        <p class="text-slate-600 text-center text-xs">
          {{ $t('checkout.checkoutMessage') }}
        </p>
        <div>
          <img src="/img/visa.png" alt="visa" />
          <img src="/img/mastercard.png" alt="mastercard" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
