import { configureStore } from '@reduxjs/toolkit';
import { splitApi } from '../services/instance';
import { useDispatch } from 'react-redux';
import { listenerMiddleware } from './middleware/auth';
import user from './slices/user/slice';

export const store = configureStore({
  reducer: {
    [splitApi.reducerPath]: splitApi.reducer,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(splitApi.middleware).prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
