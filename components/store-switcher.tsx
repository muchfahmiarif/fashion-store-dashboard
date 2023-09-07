"use client";

import React from "react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Store } from "@prisma/client";
import useStoreModal from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatedItems.find((item) => item.value === params.storeId);

  const onStoreSelected = (store: { label: string; value: string }) => {
    // if clicked popover will be close and move to store page
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button></Button>
      </PopoverTrigger>
    </Popover>
  );
};

export default StoreSwitcher;
