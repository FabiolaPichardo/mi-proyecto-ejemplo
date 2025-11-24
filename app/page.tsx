"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";

{/*Dirección del componente*/ }

export default function Home() {
  const router = useRouter();

  return (
    /*Formas de iniciar: */
    /*Con div
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">     
    </div>*/
    /*Con etiqueta que cierra y que abre */

    <>
    {/*ESTO SE IMPRIMIRÁ EN LA CONSOLA DEL SERVIDOR*/}
    {console.log("El valor NODE_ENV es:", process.env.NODE_ENV)}
      <Header showLoginButton={true} />
      <main className="container">

        <section className="section center" aria-labelledby="hero-title">
          <h1 id="hero-title">Construye una web moderna con HTML + CSS</h1>
          <p>Next.js nos da el andamiaje; HTML y CSS dan estructura y estilo.</p>
          <p>
            <a href="/sign-up" className="btn">Comienza ahora</a>
          </p>
        </section>
        <Hero />

        <section className="section" aria-labelledby="feat-title">
          <div className="container">
            <h2 id="feat-title">Características clave</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              <article className="card" role="listitem">
                <h3>Semántica</h3>
                <p>Etiquetas con significado mejoran la accesibilidad y SEO.</p>
              </article>

              <article className="card" role="listitem">
                <h3>Responsivo</h3>
                <p>Diseño que se adapta usando unidades relativas y media queries.</p>
              </article>

              <article className="card" role="listitem">
                <h3>Componentes</h3>
                <p>Divide en piezas reutilizables con CSS Modules.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 Mi Proyecto. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}