import { useNavigate } from "react-router-dom";
import "./PokeCard.css";

// interfaz de los props que recibirá el componente
interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

// componente que muestra la información básica de un Pokémon, y al hacer click navega a la página de detalles
export default function PokeCard({ id, name, image, types }: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    // al hacer click en la tarjeta, se navega a la ruta de detalles del Pokémon
    <div className="poke-card" onClick={() => navigate(`/pokemon/${id}`)}>
      <span className="poke-number">#{String(id).padStart(3, "0")}</span>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      {/* recorrido por los tipos del Pokémon */}
      <div className="type-badges">
        {types.map((type) => (
          <span key={type} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
