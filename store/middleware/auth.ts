import { userApi } from '@/services/user-api';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    if (action.payload.token) {
      Cookies.set('token', action.payload.token);
    }
  },
});
