import { Pokemon } from "../types/pokemon";

//url de la API de Pokémon
const API_URL = "https://pokeapi.co/api/v2";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

// función para obtener la lista de Pokémon,
// recibe un parámetro opcional limit para limitar
// la cantidad de Pokémon a obtener
export async function fetchPokemonList(limit: number = 5): Promise<Pokemon[]> {
  const listRes = await fetch(`${API_URL}/pokemon?limit=${limit}`);

  if (!listRes.ok) {
    throw new Error("Error al obtener la lista de Pokemon");
  }

  const listData = (await listRes.json()) as PokemonListResponse;
  const items = listData.results;

  // obtenemos los detalles de cada Pokémon usando su URL,
  // y esperamos a que se resuelvan todas las promesas
  const details = await Promise.all(
    items.map(async (item) => {
      const res = await fetch(item.url);
      if (!res.ok) {
        throw new Error(`Error al obtener detalles de ${item.name}`);
      }
      return (await res.json()) as Pokemon;
    }),
  );
  return details;
}

// obtiene los detalles de un Pokémon por su id o nombre
export async function fetchPokemonById(
  idOrName: string | number,
): Promise<Pokemon> {
  const res = await fetch(`${API_URL}/pokemon/${idOrName}`);

  if (!res.ok) {
    throw new Error(`No se encontró el Pokémon: ${idOrName}`);
  }

  return (await res.json()) as Pokemon;
}
