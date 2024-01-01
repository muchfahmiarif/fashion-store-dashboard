"use client";

import React from "react";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OrdersColumns, columns } from "./column";

interface OrderClientProps {
  data: OrdersColumns[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading title={`Orders (${data.length})`} description={`Manage orders for yout store`} />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
