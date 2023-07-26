import Image from "next/image";
import React from "react";
import AddButton from "./AddButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import RemoveButton from "./RemoveButton";
const prisma = new PrismaClient();
type Props = {
  pokemon: any;
};
async function PokeCard({ pokemon }: Props) {
  const session = await getServerSession(authOptions);
  let isPokemonAdded = false;
  if (session) {
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
    if (user?.pokemons.some((p) => p.pokemonId === pokemon.id.toString())) {
      isPokemonAdded = true;
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center p-3 rounded-lg shadow-md relative">
      <Image
        loading="lazy"
        width={200}
        src={pokemon.sprites.other.home.front_default}
        height={200}
        alt={pokemon.name}
      />
      <p>{pokemon.name}</p>
      <p className="absolute top-1 left-1">{pokemon.id}</p>
      {isPokemonAdded ? (
        <RemoveButton pokemon={pokemon} />
      ) : (
        <AddButton pokemon={pokemon} />
      )}
    </div>
  );
}

export default PokeCard;
