import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getAddedPokemon } from "@/libs/Funtions";
import PokeCard from "@/components/PokeCard";
import Image from "next/image";
type Props = {};
const prisma = new PrismaClient();
async function DashboardPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email || undefined,
    },
    select: {
      id: true,
      email: true,
      name: true,
      pokemons: true,
    },
  });

  return (
    <div>
      <div>
        <p>Hello {session?.user?.name}</p>
        <div className="flex flex-wrap items-center justify-around gap-3 p-3">
          {user?.pokemons.slice(1, user.pokemons.length).map((pokemon: any) => (
            <div
              key={pokemon.pokemonId}
              className="flex flex-col gap-2 items-center p-3 rounded-lg shadow-md relative border border-gray-200"
            >
              <Image
                loading="lazy"
                width={200}
                src={pokemon.pokemonImage}
                height={200}
                alt={pokemon.pokemonName}
              />
              <p>{pokemon.pokemonName}</p>
              <p className="absolute top-1 left-1">{pokemon.pokemonId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
