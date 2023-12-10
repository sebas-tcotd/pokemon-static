import { MainLayout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";

interface PokemonPageProps {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  const [isInFavorites, setAsFavorite] = useState(
    localFavorites.isFavorite(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setAsFavorite(!isInFavorites);

    if (!isInFavorites) {
      confetti({
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          y: 0,
          x: 1,
        },
      });
    }
  };

  return (
    <MainLayout title={pokemon.name}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
        <Card isHoverable className="p-8 lg:col-start-1 lg:col-end-4">
          <CardBody>
            <Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                "no-image.png"
              }
              alt={pokemon.name}
              width="100%"
              height={100}
              className="h-48 md:h-52 lg:h-64"
            />
          </CardBody>
        </Card>

        <Card className="p-2 lg:col-start-4 lg:col-end-9">
          <CardHeader className="flex flex-wrap justify-between gap-2">
            <h1 className="first-letter:capitalize text-4xl">{pokemon.name}</h1>
            <Button
              color="primary"
              variant={!isInFavorites ? "ghost" : "shadow"}
              onClick={onToggleFavorite}
            >
              {!isInFavorites ? "Guardar en favoritos" : "En favoritos"}
            </Button>
          </CardHeader>
          <CardBody>
            <h2>Sprites:</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(pokemon.sprites).map((key) => {
                const sprite = pokemon.sprites[key as keyof Pokemon["sprites"]];

                return (
                  typeof sprite === "string" && (
                    <Image
                      key={key}
                      src={sprite as string}
                      alt={key}
                      width="100%"
                      height={200}
                    />
                  )
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = [...new Array(151)].map((_, index) => `${index + 1}`);

  return {
    paths: pokemons.map((id) => ({ params: { id } as const })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { pokemon }, revalidate: 86400 };
};

export default PokemonPage;
