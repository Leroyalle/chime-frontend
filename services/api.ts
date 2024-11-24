import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const splitApi = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
