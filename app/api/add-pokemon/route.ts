import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  // const finalId = selectedId.toString();
  const { pokemonId, pokemonName, pokemonImage } = body;
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
  console.log(user);
  if (!user) {
    return new NextResponse("You have to log in first", { status: 400 });
  }

  await prisma.pokemon.create({
    data: {
      userId: user.id,
      pokemonId: pokemonId.toString(),
      pokemonImage: pokemonImage,
      pokemonName: pokemonName,
    },
  });

  return NextResponse.json("Added successfully", { status: 200 });
}
