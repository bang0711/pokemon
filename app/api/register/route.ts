import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, password } = body;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (isUserExist) {
    return new NextResponse("User already exists", {
      status: 400,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
      pokemons: {
        create: {
          pokemonId: "",
          pokemonImage: "",
          pokemonName: "",
        },
      },
    },
  });
  return NextResponse.json(user);
}
