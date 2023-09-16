import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div>
      <h2>Active store : {store?.name}</h2>
      <p>Description store : {store?.description}</p>
      <p>Group : {store?.group}</p>
    </div>
  );
};

export default DashboardPage;
