import pokeApi from "@/api/pokemon-api";
import { MainLayout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface PokemonPageProps {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  return (
    <MainLayout title={pokemon.name}>
      
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = [...new Array(151)].map((_, index) => `${index + 1}`);

  return {
    paths: pokemons.map((id) => ({ params: { id } as const })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  const props = { pokemon: data };

  return { props };
};

export default PokemonPage;
