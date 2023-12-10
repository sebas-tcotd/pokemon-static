import { Card, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  id: number;
}

export const FavoritePokemonCard: FC<Props> = ({ id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Card
      key={id}
      isPressable
      onClick={handleClick}
      className="flex justify-center items-center p-2"
    >
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={`Pokemon ${id}`}
        title={`Pokemon ${id}`}
        className="h-24"
      />
    </Card>
  );
};
