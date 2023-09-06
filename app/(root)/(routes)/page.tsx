"use client";

import useStoreModal from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function SetupPage() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">Test</main>;
}
