"use client";

import React from "react";
import { PopoverTrigger } from "@/components/ui/popover";
import { Store } from "@prisma/client";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  return <div>StoreSwitcher</div>;
};

export default StoreSwitcher;
