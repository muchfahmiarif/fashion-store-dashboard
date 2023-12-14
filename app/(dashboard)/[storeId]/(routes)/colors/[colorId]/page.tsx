import prismadb from "@/lib/prismadb";
import ColorsForm from "./components/colorForm";

type ColorIdPage = {
  params: {
    colorId: string;
  };
};

const ColorId: React.FC<ColorIdPage> = async ({ params }) => {
  const colors = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsForm initialData={colors} />
      </div>
    </div>
  );
};

export default ColorId;
