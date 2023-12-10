import { FC } from "react";
import { FavoritePokemonCard } from "./FavoritePokemonCard";

interface Props {
  favoritePokemons: number[];
}

export const FavoritePokemons: FC<Props> = ({ favoritePokemons }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {favoritePokemons.map((id) => (
        <FavoritePokemonCard key={id} id={id} />
      ))}
    </div>
  );
};
