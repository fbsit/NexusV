import { ModuleProviderExports } from '@medusajs/framework/types'
import MercadoPagoProviderService from './service'

const services = [MercadoPagoProviderService]

const providerExport: ModuleProviderExports = {
  services,
}

export default providerExport


