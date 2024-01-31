export const uiEs = {
  home: {
    title: 'Ingresa la información de tu reserva:',
    btnText: 'Siguiente',
    inputErrors: {
      required: 'Este campo es obligatorio',
      email: 'Ingrese un E-mail valido',
    },
  },

  reservationReview: {
    similar: 'o Similar',
    pickup: 'RETIRO',
    return: 'RETORNO',
  },

  buttons: {
    next: 'Siguiente',
    cancel: 'Cancelar',
    back: 'Regresar',
  },

  clientInfoForm: {
    title: 'Verifica tu información',
    name: 'Nombre',
    license: 'Numero de Licencia',
    number: 'Teléfono',
  },

  optionalCoverage: {
    title: 'Coberturas Opcionales',
  },

  checkout: {
    card: {
      title: 'Pago con Tarjeta',
      number: {
        text: 'Número de tarjeta',
        error: 'Ingrese un número de tarjeta valido',
      },

      expiration: {
        text: 'Fecha de expiración',
        error: 'Ingrese una fecha valida',
      },
      cvv: {
        error: 'Ingrese un número CVV valido',
      },
      button: 'Pagar',
    },
    others: {
      title: 'Otros métodos de pago',
    },
    checkoutMessage:
      'Para tarjetas distints a Visa o Mastercard, utilice PayPal',
  },

  modals: {
    cancel: {
      title: '¿Desea cancelar su reservación?',
      buttons: {
        close: 'Cerrar',
        cancel: 'Cancelar',
      },
      canceledTitle: 'Reservación cancelada',
      canceledSubtitle: 'Redireccionando a la pagina de inicio',
    },
    paymentSuccess: {
      title: 'Pago realizado',
      subtitle: 'Redireccionando al resumen de su compra',
    },
  },

  success: {
    title: 'Gracias,',
    subtitle: 'Aqui esta el resumen de su reserva',
  },

  progress: {
    reservation: 'Reservacion',
    coverages: 'Coberturas',
  },

  reservationBill: {
    title: 'Detalles de la reserva',
    model: 'Modelo',
    coverages: 'Coberturas',
    airport_fee: 'Impuesto de Aeropuerto',
    era: 'Asistencia Vial (ERA)',
  },
};
