import React from "react";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboard = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
