import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { fetchPokemonList } from "./services/PokeService";
import PokeCard from "./components/PokeCard";
import PokeDetails from "./pages/PokeDetails";
import { Pokemon } from "./types/pokemon";
import "./App.css";

export default function App() {
  // Estado para almacenar la lista de Pokémon, el estado de carga y errores
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para cargar la lista de Pokémon al montar el componente
  useEffect(() => {
    fetchPokemonList(20)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  //respuesta de carga y manejo de errores
  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  // habilitar navegación a detalles de Pokémon
  return (
    <BrowserRouter>
      <Routes>
        {/* muestra el listado de Pokémon */}
        <Route
          path="/"
          element={
            <div className="App">
              <header className="header">
                <strong>Aplicaciones Web</strong>
              </header>

              <div className="container">
                <h1>POKEDEX volumen 1</h1>
                <p>Ven y descubre los diferentes Pokemones del mundo Pokémon</p>
              </div>

              {/* grid de tarjetas de Pokémon */}
              <div className="pokemon-grid">
                {pokemon.map((p) => (
                  // cada tarjeta muestra el nombre, imagen y tipos del Pokémon
                  <PokeCard
                    key={p.id}
                    id={p.id}
                    name={p.name} // nombre del Pokémon
                    image={p.sprites.front_default} // imagen del Pokémon
                    types={p.types.map((t) => t.type.name)} //nombre del tipo de Pokémon
                  />
                ))}
              </div>

              <footer className="footer">
                <span>ISyTE G-961. Lira. 2026</span>
              </footer>
            </div>
          }
        />
        {/* ruta para mostrar detalles de un Pokémon específico */}
        <Route path="/pokemon/:id" element={<PokeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
