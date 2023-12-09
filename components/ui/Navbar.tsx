import { Link, Spacer } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  return (
    <div className="flex w-full flex-row items-center justify-start px-0 bg-gray-900">
      <NextLink href="/" className="flex gap-0 items-center">
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          alt="ícono de la app"
          width={70}
          height={70}
          priority
        />
        <span className="first-letter:text-2xl text-xl align-middle">
          Pokémon
        </span>
      </NextLink>
      <Spacer className="flex-1" />

      <Link href="/favorites" color="foreground" className="pr-5">Favoritos</Link>
    </div>
  );
};
