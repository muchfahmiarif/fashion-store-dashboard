import React from "react";
import { format } from "date-fns";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/column";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedCategories: BillboardColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createAt, "dd MMM yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
