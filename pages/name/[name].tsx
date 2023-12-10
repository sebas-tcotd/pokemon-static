import pokeApi from "@/api/pokemon-api";
import { MainLayout } from "@/components/layouts";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

interface NamePageProps {
  pokemon: Pokemon;
}

const NamePage: NextPage<NamePageProps> = ({ pokemon }) => {
  const [isInFavorites, setAsFavorite] = useState(false);
  useEffect(() => {
    setAsFavorite(localFavorites.isFavorite(pokemon.id));
  }, [pokemon.id]);

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
                      src={sprite}
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

export const getStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemonNames = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({ params: { name } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { pokemon },
  };
};

export default NamePage;
