"use client";

import React from "react";
import { PopoverTrigger } from "@/components/ui/popover";
import { Store } from "@prisma/client";
import useStoreModal from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const curretStore = formatedItems.find((item) => item.value === params.storeId);

  return <div>StoreSwitcher</div>;
};

export default StoreSwitcher;
