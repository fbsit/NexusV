import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start text-left small:p-32 gap-6 ml-6 small:ml-12">
        <Heading
          level="h1"
          className="text-3xl leading-10 text-ui-fg-base font-semibold"
        >
          Fresco, de calidad y al mejor precio
        </Heading>
        <Heading
          level="h2"
          className="text-xl leading-8 text-ui-fg-subtle font-normal max-w-xl"
        >
          Compra carnes y abarrotes seleccionados con entrega rápida. Ahorra con ofertas semanales y recibe en tu puerta.
        </Heading>
        <div className="flex gap-3">
          <a href="#categorias" className="inline-flex">
            <Button variant="primary">Explorar categorías</Button>
          </a>
          <a href="/search" className="inline-flex">
            <Button variant="secondary">Buscar productos</Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
