import React from "react";
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import BillboardClient from "./components/client";
import { ProductColumn } from "./components/column";

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

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeature: item.isFeature,
    isArchived: item.isArchived,
    // if type data "decimal" is not supported by the formatter, add function toNumber() after price
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
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
