import { create } from "zustand";

interface StoreModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStoreModal = create<StoreModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStoreModal;
