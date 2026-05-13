export interface PokemonType {
  //slot es un número que indica el orden del tipo en la lista de tipos del Pokémon
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  // sprites es un objeto que contiene varias propiedades,
  // solo agregamos la imagen
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

// interfaz de la respuesta del endpoint
export interface PokemonListItem {
  name: string;
  url: string;
}
