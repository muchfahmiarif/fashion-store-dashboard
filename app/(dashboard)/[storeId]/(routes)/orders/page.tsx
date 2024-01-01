import React from "react";
import { format } from "date-fns";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { OrdersColumns } from "./components/column";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedOrders: OrdersColumns[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems.map((orderItems) => orderItems.product.name).join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(item.createAt, "dd MMM yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
