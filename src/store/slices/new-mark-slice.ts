import { create } from 'zustand';

interface Store {
  newMark: boolean;
  setNewMark: (newMark: boolean) => void;
}

export const useNewMarkSlice = create<Store>()((set) => ({
  newMark: false,
  setNewMark: (newMark: boolean) => set({ newMark }),
}));
