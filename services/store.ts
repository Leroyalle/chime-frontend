import { configureStore } from '@reduxjs/toolkit';
import { splitApi } from './api';

export const store = configureStore({
  reducer: {
    [splitApi.reducerPath]: splitApi.reducer,
  },
});
