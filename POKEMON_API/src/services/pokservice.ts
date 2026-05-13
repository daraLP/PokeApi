import { Pokemon, PokemonListItem } from "../types/pokemon";

//url de la API de Pokémon
const API_URL = "https://pokeapi.co/api/v2";

// función para obtener la lista de Pokémon con sus detalles
export async function fetchPokemonList(limit: number = 20): Promise<Pokemon[]> {
  // petición para obtener la lista de Pokémon con el límite especificado
  const listRes = await fetch(`${API_URL}/pokemon?limit=${limit}`);

  // si la respuesta no es exitosa, lanzamos un error
  if (!listRes.ok) {
    throw new Error("Error al obtener detalles");
  }

  // parseamos la respuesta como JSON y extraemos los resultados
  //parsear es convertir la respuesta de texto a un objeto JavaScript
  const listData = await listRes.json();
  // obtenemos la lista de Pokémon, que es un array de objetos con nombre y URL para obtener los detalles de cada Pokémon
  const items: PokemonListItem[] = listData.results;

  // con la promesa Promise.all, hacemos una petición para cada Pokémon
  // en la lista para obtener sus detalles, y esperamos a que todas las
  // promesas se resuelvan para obtener un array con los detalles de todos los Pokémon
  const detalles = await Promise.all(
    items.map(async (item) => {
      const res = await fetch(item.url);
      // si la respuesta no es exitosa, lanzamos un error
      if (!res.ok) {
        throw new Error("Error al obtener detalles");
      }
      return (await res.json()) as Pokemon;
    }),
  );
  return detalles;
}
