"use client";

import useStoreModal from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";

const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal title="Title Modal" description="Description Modal" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
      Children Modal
    </Modal>
  );
};

export default StoreModal;
