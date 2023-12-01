export enum ErrorCodes {
  NO_ITEMS_FOUND = 'not items found',
  FETCH_ERROR = 'Fetch Error',
}
export type Response<T> = {
  data: T[] | null;
  error: ErrorCodes | null;
};

export type FormValues = {
  reservation: string;
  email: string;
};
