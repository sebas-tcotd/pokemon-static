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
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokédex, pokémon`} />
      </Head>

      <Navbar />

      <main className="py-4 px-5">{children}</main>
    </>
  );
};
