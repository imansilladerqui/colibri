import { Hero } from "@/components/sections/hero";
import { Estudio } from "@/components/sections/estudio";
import { Proyectos } from "@/components/sections/proyectos";
import { Servicios } from "@/components/sections/servicios";
import { Contacto } from "@/components/sections/contacto";

const Home = () => {
  return (
    <>
      <Hero />
      <Estudio />
      <Proyectos />
      <Servicios />
      <Contacto />
    </>
  );
};

export default Home;
