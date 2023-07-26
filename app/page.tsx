import React from "react";
import { getPokemon } from "@/libs/Funtions";
import PokeCard from "@/components/PokeCard";

type Props = {};

async function HomePage({}: Props) {
  const data = await getPokemon(1);
  const pokemons = data.results;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {pokemons.map(async (pokemon: any) => {
        const data = await fetch(pokemon.url);
        const result: Pokemon = await data.json();
        return <PokeCard pokemon={result} key={result.id} />;
      })}
    </div>
  );
}

export default HomePage;

// yKnLQA70M3FgvsKd
