import { create } from 'zustand';

type SharedPostType = {
  contentPost: string;
  imagePreview: string | null;
  postId: string;
};

interface Store {
  sharedPost: SharedPostType | null;
  setSharedPost: (post: Store['sharedPost']) => void;
  resetSharedPost: VoidFunction;
}

export const useSharedPostSlice = create<Store>()((set) => ({
  sharedPost: null,
  setSharedPost: (sharedPost: Store['sharedPost']) => set({ sharedPost }),
  resetSharedPost: () => set({ sharedPost: null }),
}));
