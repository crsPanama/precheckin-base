export enum ErrorCodes {
  NO_ITEMS_FOUND = 'not items found',
  FETCH_ERROR = 'Fetch Error',
}

export enum AlertTypes {
  ERROR = 'error',
  ALERT = 'alert',
  NO_ALERT = '',
}

export enum ReservationStatus {
  PAYED = 'Prechecking Pagado',
  NOT_PAYED = 'Pendiente de Prechecking',
  CANCELED = 'Cancelado',
}

export type Response<T> = {
  data: T[] | null;
  error: ErrorCodes | null;
};

export type FormValues = {
  reservation: string;
  email: string;
};

export type Alert = {
  type: AlertTypes;
  message: string;
};

export enum ProcessRoutes {
  COVERAGES = 'coverages',
  EXTRAS = 'extras',
  CHECKOUT = 'checkout',
}
