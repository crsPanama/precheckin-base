import { type Response, ErrorCodes } from './../types/types.d';
import type { DirectusQueryParams } from 'nuxt-directus/dist/runtime/types';

export const useDirectusFetch = () => {
  const { getItems } = useDirectusItems();

  //Wrapper for useDirectusItems getItems functions, adds an error handling in case data is empty
  const fetchItems = async <T>(
    collection: string,
    params?: DirectusQueryParams
  ): Promise<Response<T>> => {
    try {
      const data = await getItems<T>({
        collection,
        params,
      });
      return {
        data: data.length > 0 ? data : null,
        error: data.length > 0 ? null : ErrorCodes.NO_ITEMS_FOUND,
      };
    } catch (error) {
      throw new Error(`${ErrorCodes.FETCH_ERROR}: ${error}`);
    }
  };

  return {
    fetchItems,
  };
};
