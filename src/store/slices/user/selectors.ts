import { RootState } from '@/store/store';

export const selectCurrent = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.current;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
