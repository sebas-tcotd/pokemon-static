import pokeApi from "@/api/pokemon-api";
import { MainLayout } from "@/components/layouts";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { NextPage } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <MainLayout title="Listado de Pokémons">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <Card shadow="sm" key={pokemon.id}>
            <CardBody className="overflow-visible">
              <Image
                src={pokemon.img}
                alt={pokemon.name}
                
                width={'100%'}
                className="mx-auto h-16 md:h-24 lg:h-36 lg:p-2"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <span className="font-bold first-letter:capitalize">{pokemon.name}</span>
              <p className="text-default-500">#{pokemon.id}</p>
              
              </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
