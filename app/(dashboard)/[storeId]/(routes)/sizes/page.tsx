import React from "react";
import { format } from "date-fns";
import SiezesClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { SizesColumn } from "./components/column";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const formattedSizes: SizesColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createAt, "dd MMM yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SiezesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
