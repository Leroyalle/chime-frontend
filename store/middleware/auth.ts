import { userApi } from '@/services/user-api';
import { createListenerMiddleware } from '@reduxjs/toolkit';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    if (action.payload.token) {
      localStorage.setItem('token', action.payload.token);
    }
  },
});
