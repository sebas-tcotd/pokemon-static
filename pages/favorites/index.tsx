import { MainLayout } from "@/components/layouts";
import { FavoritePokemons } from "@/components/pokemon";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { Card, Image } from "@nextui-org/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);
  useEffect(() => {
    setFavoritePokemons(localFavorites.favoritePokemons());
  }, []);

  return (
    <MainLayout title="Pokémon | Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons favoritePokemons={favoritePokemons} />
      )}
    </MainLayout>
  );
};

export default FavoritesPage;
