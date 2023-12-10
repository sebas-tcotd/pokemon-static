import { SmallPokemon } from "@/interfaces";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface PokemonCardProps {
  /** Objeto con la información del Pokémon. */
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Card shadow="sm" isPressable onClick={handleClick}>
      <CardBody className="p-4">
        <Image
          radius="lg"
          width="100%"
          className="h-16 md:h-24 lg:h-36 lg:p-2 bg-cover"
          alt={pokemon.name}
          src={pokemon.img}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b className="capitalize">{pokemon.name}</b>
        <p className="text-default-500">#{pokemon.id}</p>
      </CardFooter>
    </Card>
  );
};
