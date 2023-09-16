import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, description, group } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Missing description", { status: 400 });
    }

    if (!group) {
      return new NextResponse("Missing group", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        description,
        group,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
