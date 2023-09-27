"use client";

import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./column";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant={"ghost"}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
