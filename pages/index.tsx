import { MainLayout } from "@/components/layouts";
import { Button } from "@nextui-org/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <MainLayout title="Listado de Pokémons">
      <h1>Hola mundo</h1>
      <Button color="primary">Click me!</Button>
    </MainLayout>
  );
};

export default Home;
