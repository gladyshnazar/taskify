import { create } from "zustand";

type ProModalStore = {
  id: string | null,
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProModal = create<ProModalStore>(set => ({
  id: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
