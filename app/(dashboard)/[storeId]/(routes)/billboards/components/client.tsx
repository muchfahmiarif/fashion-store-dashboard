import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";

const BillboardClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Billboards (0)`} description={`Manage billboards for yout store`} />
        <Button className="" variant={`default`}>
          <Plus className="mr-2 h-4 w-4" />
          Add Billboard
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardClient;
