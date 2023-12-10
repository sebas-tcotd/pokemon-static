import { Image } from "@nextui-org/react";
import React from "react";

export const NoFavorites = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 lg:gap-12 h-[80dvh]">
      <p className="text-4xl lg:text-7xl">No hay favoritos</p>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        width={250}
        height={250}
        alt="There are no favorites"
        className="!opacity-10"
      />
    </div>
  );
};
