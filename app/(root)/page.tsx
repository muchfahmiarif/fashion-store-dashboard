"use client";

import Modal from "@/components/ui/modal";

export default function SetupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Modal title="Modal Test" description="Descripton" isOpen onClose={() => {}}>
        Test
      </Modal>
    </main>
  );
}
