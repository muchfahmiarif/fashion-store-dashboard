import prismadb from "@/lib/prismadb";

type BillboardIdProps = {
  params: {
    billboardId: string;
  };
};

const BillboardId: React.FC<BillboardIdProps> = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return <div>Existins billboard : {billboard?.label}</div>;
};

export default BillboardId;
