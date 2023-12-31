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
