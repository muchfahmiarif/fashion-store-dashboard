import { create } from "zustand";

interface StoreModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useStoreModal = create<StoreModal>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useStoreModal;
