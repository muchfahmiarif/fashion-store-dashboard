"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Modal title="Are you sure?" description="This action cannot be undone." isOpen={isOpen} onClose={onClose}>
        <div className="pt-6 space-x-2 w-full justify-end items-start flex">
          <Button variant={"outline"} disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"destructive"} disabled={loading} onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal;
