import { Spacer } from "@nextui-org/react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="flex w-full flex-row items-center justify-start px-0 bg-gray-900">
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="ícono de la app"
        width={70}
        height={70}
      />
      <span className="first-letter:text-2xl text-xl align-middle">
        Pokémon
      </span>
      <Spacer className="flex-1" />
      <span>Favoritos</span>
    </div>
  );
};
