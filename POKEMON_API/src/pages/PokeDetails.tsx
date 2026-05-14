import { useState, useEffect } from "react";
import { fetchPokemonById } from "../services/PokeService";
import { Pokemon } from "../types/pokemon";
import { useNavigate, useParams } from "react-router-dom";

export default function PokeDetails() {
  // obtenemos el id del pokemon desde los parámetros de la URL, y el navigate para poder volver a la página principal
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // al cargar el componente, obtenemos los detalles del pokemon usando su id,
  // y actualizamos el estado con la información obtenida
  useEffect(() => {
    if (!id) return;

    // llamamos a la función fetchPokemonById para obtener los detalles del pokemon,
    //  y manejamos el estado de carga y error
    fetchPokemonById(id)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  //mensajes de carga y error, y si no se encuentra el pokemon
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return <p>No se encontró el Pokémon</p>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Volver
      </button>

      {/* detalles del pokemon */}
      <h1>{pokemon.name}</h1>
      <span>#{String(pokemon.id).padStart(3, "0")}</span>

      {/* imagen del pokemon */}
      <img
        src={
          pokemon.sprites.other?.["official-artwork"].front_default ??
          pokemon.sprites.front_default
        }
        alt={pokemon.name}
        className="detail-image"
      />

      {/* tipos del pokemon */}
      <div>
        {pokemon.types.map((t) => (
          <span key={t.type.name} className={`type-badge type-${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>

      {/* estadísticas del pokemon */}
      <p>
        <strong>Altura:</strong> {pokemon.height / 10} m
      </p>
      <p>
        <strong>Peso:</strong> {pokemon.weight / 10} kg
      </p>

      {/* habilidades del pokemon */}
      <h3>Habilidades</h3>
      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability?.name}>
            {a.ability?.name}
            {a.is_hidden && <em> (oculta)</em>}
          </li>
        ))}
      </ul>

      {/* estadísticas base como barras de progreso */}
      <h3>Estadísticas base</h3>
      {pokemon.stats.map((s) => (
        // cada estadística se muestra con su nombre,
        // valor y una barra de progreso proporcional al valor máximo (255)
        <div key={s.stat.name} className="stat-row">
          <span className="stat-name">{s.stat.name}</span>
          <span className="stat-value">{s.base_stat}</span>
          <div className="stat-bar-bg">
            <div
              className="stat-bar-fill"
              style={{ width: `${(s.base_stat / 255) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
