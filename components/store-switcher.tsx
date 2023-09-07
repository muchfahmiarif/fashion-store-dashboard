"use client";

import React from "react";
import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Store } from "@prisma/client";
import useStoreModal from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

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
        <Button
          variant={`outline`}
          size={`sm`}
          aria-expanded={open}
          aria-label="Selec a store"
          className={cn("w-[200px] justify-between", className)}>
          <StoreIcon className="mr-2 h-4 w-4" />
          Current Store
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {formatedItems.map((store) => (
                  <CommandItem key={store.value} onSelect={() => onStoreSelected(store)} className="text-sm">
                    <Check className={cn("mr-2 h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
                    {store.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup></CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
};

export default StoreSwitcher;
