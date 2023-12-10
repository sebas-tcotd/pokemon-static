import { LocalStorageEnum } from "@/enums";

const toggleFavorites = (id: number): void => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem(LocalStorageEnum.favorites) || "[]"
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((fav) => fav !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(LocalStorageEnum.favorites, JSON.stringify(favorites));
};

const isFavorite = (id: number): boolean => {
  if (typeof window === "undefined") return false;

  const favorites: number[] = JSON.parse(
    localStorage.getItem(LocalStorageEnum.favorites) || "[]"
  );

  return favorites.includes(id);
};

const favoritePokemons = (): number[] => {
  return JSON.parse(localStorage.getItem(LocalStorageEnum.favorites) || "[]");
};

const localFavorites = {
  toggleFavorites,
  isFavorite,
  favoritePokemons
};
export default localFavorites;
