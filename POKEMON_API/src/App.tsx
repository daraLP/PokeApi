import { useState, useEffect } from "react";
import { fetchPokemonList } from "./services/pokservice";
import { Pokemon } from "./types/pokemon";

export default function App() {
  // estado para almacenar la lista de Pokémon, el estado de carga y el estado de error
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //useEffect se ejecuta después de que el componente se monta
  useEffect(() => {
    fetchPokemonList(20)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // si el estado de carga es true, mostramos un mensaje de carga
  // o de error si el estado de error no es null,
  // de lo contrario mostramos la lista de Pokémon
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <h1>POKEDEX volumen 1</h1>
          <p>Ven y descubre los diferentes Pokemones del mundo Pokémon</p>
        </div>
        {/* // en la parte derecha mostramos la lista de Pokémon en una cuadrícula */}
        <div className="pokemon-grid">
          {pokemon.map((p) => (
            <div key={p.id} className="pokemon-card">
              <span className="pokemon-number">
                #{String(p.id).padStart(3, "0")}
              </span>
              {/* // mostramos la imagen del Pokémon, su nombre y sus tipos */}
              <img src={p.sprites.front_default} alt={p.name} width={80} />
              <p className="pokemon-name">{p.name}</p>
              <div className="type-badges">
                {p.types.map((t) => (
                  // cada tipo se muestra como una etiqueta con el nombre del tipo */}

                  <span key={t.type.name} className="type-badge">
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
