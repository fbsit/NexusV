import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="w-full bg-[#063a68] text-white">
      <div className="content-container flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-10 py-14">
          <div className="space-y-4">
            <LocalizedClientLink href="/" className="txt-compact-xlarge-plus uppercase">
              <span className="font-semibold tracking-wide">Nexus</span>
              <span className="font-semibold tracking-wide text-[#ff6a00]"> v</span>
            </LocalizedClientLink>
            <p className="text-white">
              "Todo lo que imaginas, a un clic de tu despensa."
            </p>
            <div className="flex items-center gap-4 text-lg">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="txt-small-plus">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-white">
              <li><LocalizedClientLink href="/store">Catálogo</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/">Programa de Puntos</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/">Tracking</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/">Conviértete en Proveedor</LocalizedClientLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="txt-small-plus">Categorías</h3>
            <ul className="space-y-2 text-white">
              <li><LocalizedClientLink href="/store">Congelados</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/store">Huevos</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/store">Porcelanato</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/store">Muebles</LocalizedClientLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="txt-small-plus">Contacto</h3>
            <ul className="space-y-2 text-white">
              <li>+569 30660016</li>
              <li>nexusv@gmail.com</li>
              <li>Coronel, Chile</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 pb-10 flex flex-col md:flex-row items-center justify-between text-white">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Shalom Chef. Todos los derechos reservados.
          </Text>
          <div className="flex gap-6 mt-4 md:mt-0">
            <LocalizedClientLink href="/">Términos y Condiciones</LocalizedClientLink>
            <LocalizedClientLink href="/">Política de Privacidad</LocalizedClientLink>
            <LocalizedClientLink href="/">Política de Devoluciones</LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
