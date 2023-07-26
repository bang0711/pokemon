import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const selectedId = await req.json();
  const finalId = selectedId.toString();
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
    select: {
      name: true,
      email: true,
      id: true,
      pokemons: true,
    },
  });

  if (!user) {
    return new NextResponse("You have to log in first", { status: 400 });
  }

  await prisma.pokemon.delete({
    where: {
      pokemonId: finalId,
      userId: user.id,
    },
  });
  return NextResponse.json("Remove successfully", { status: 200 });
}
