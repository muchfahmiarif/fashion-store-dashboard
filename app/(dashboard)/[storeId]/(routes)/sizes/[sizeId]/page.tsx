import prismadb from "@/lib/prismadb";
import SizeForm from "./components/sizeForm";

type SizeIdPage = {
  params: {
    sizeId: string;
  };
};

const SizeId: React.FC<SizeIdPage> = async ({ params }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizeId;
