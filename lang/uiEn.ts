export const uiEn = {
  home: {
    title: 'Enter your reservation information:',
    btnText: 'Next',
    inputErrors: {
      required: 'This field is required',
      email: 'Add a valid Email',
    },
    alertMessages: {
      canceled: 'This reservation has been canceled',
      error: 'Error: reservation not found, check your reservation info',
      payed: 'This reservation is already payed',
    },
  },

  reservationReview: {
    similar: 'or Similar',
    pickup: 'PICKUP',
    return: 'RETURN',
  },

  buttons: {
    next: 'Next',
    cancel: 'Cancel',
    back: 'Back',
  },

  clientInfoForm: {
    title: 'Verify your information',
    name: 'Name',
    license: 'License Number',
    number: 'Phone Number',
  },
  progress: {
    reservation: 'Reservation',
    coverages: 'Coverages',
  },

  optionalCoverage: {
    title: 'Optional Coverages',
  },

  checkout: {
    card: {
      title: 'Card Payment',
      number: {
        text: 'Card Number',
        error: 'Add a valid Card Number',
      },

      expiration: {
        text: 'Expiration Date',
        error: 'Add a valid expiration date',
      },
      cvv: {
        error: 'Add a valid CVV number',
      },
      button: 'Pay',
    },
    others: {
      title: 'Other Payment Options',
    },
    checkoutMessage:
      'For cards other than Visa or Mastercard, use the PayPal method',
  },

  modals: {
    cancel: {
      title: 'Do you want to cancel this reservation?',
      buttons: {
        close: 'Close',
        cancel: 'Cancel',
      },
      canceledTitle: 'Reservation canceled',
      canceledSubtitle: 'Redirecting to home page',
    },
    paymentSuccess: {
      title: 'Payment success',
      subtitle: 'Redirecting to reservation review page',
    },
  },

  success: {
    title: 'Thanks,',
    subtitle: "Here's your reservation review",
  },

  reservationBill: {
    title: 'Reservation Details',
    model: 'Model',
    coverages: 'Coverages',
    airport_fee: 'Airport Fee',
    era: 'Road Assistance (ERA)',
  },
};
