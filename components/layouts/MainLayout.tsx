import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui";

interface MainLayoutProps {
  /** El título de la página. */
  title?: string;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title ?? "Pokemon App"}</title>
        <meta name="author" content="Sebastian Vargas" />
        <meta name="description" content="Información sobre el pokémon xxxx" />
        <meta name="keywords" content="name_of_the_pokemon, pokédex, pokémon" />
      </Head>

      <Navbar />

      <main className="py-0 px-5">{children}</main>
    </>
  );
};
