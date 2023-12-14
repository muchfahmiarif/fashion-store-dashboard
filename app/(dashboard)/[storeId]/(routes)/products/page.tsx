import React from "react";
import { format } from "date-fns";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/column";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedProducts: BillboardColumn[] = products.map((item) => ({
    id: item.id,
    label: item.name,
    isFeature: item.isFeature,
    isArchived: item.isArchived,
    price: item.price,
    createdAt: format(item.createAt, "dd MMM yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
