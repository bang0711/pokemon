export async function getPokemon(page: number) {
  const res = await fetch(
    ` https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 20}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch.");
  }

  return res.json();
}

export async function getAddedPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch.");
  }

  return res.json();
}
