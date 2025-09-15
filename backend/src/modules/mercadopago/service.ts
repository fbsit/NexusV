import { AbstractPaymentProvider } from '@medusajs/framework/utils'
import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from '@medusajs/framework/types'
import { BACKEND_URL } from '../../lib/constants'

type MercadoPagoOptions = {
  accessToken: string
  posId?: string
  notificationUrl?: string
}

export default class MercadoPagoProviderService extends AbstractPaymentProvider<MercadoPagoOptions> {
  static identifier = 'mercadopago'

  // TODO: initialize official SDK if desired
  constructor(container: Record<string, unknown>, options: MercadoPagoOptions) {
    super(container, options)
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    // Crear preferencia de Mercado Pago para Checkout Pro
    const upperCurrency = (input.currency_code || '').toUpperCase()
    const zeroDecimalCurrencies = new Set(['KRW', 'JPY', 'VND', 'CLP', 'PYG'])
    const unitPrice = zeroDecimalCurrencies.has(upperCurrency)
      ? Number(input.amount)
      : Number(input.amount) / 100

    const body: any = {
      items: [
        {
          title: 'Pedido NexusV',
          quantity: 1,
          unit_price: unitPrice,
          currency_id: upperCurrency,
        },
      ],
      notification_url: this.config.notificationUrl,
      statement_descriptor: 'NexusV',
      auto_return: 'approved',
      back_urls: {
        success: `${BACKEND_URL}/api/mercado-pago/return?status=success`,
        pending: `${BACKEND_URL}/api/mercado-pago/return?status=pending`,
        failure: `${BACKEND_URL}/api/mercado-pago/return?status=failure`,
      },
    }

    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.accessToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!resp.ok) {
      const txt = await resp.text()
      throw new Error(`MercadoPago preference error: ${resp.status} ${txt}`)
    }

    const pref = (await resp.json()) as any

    return {
      id: pref.id,
      data: {
        id: pref.id,
        init_point: pref.init_point,
        sandbox_init_point: pref.sandbox_init_point,
        amount: input.amount,
        currency_code: input.currency_code,
      },
    }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return {
      data: {
        ...input.data,
        amount: input.amount,
        currency_code: input.currency_code,
      },
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    // Mercado Pago puede autorizar de inmediato según el flujo
    return {
      data: input.data,
      status: 'authorized',
    }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    // Placeholder, devolver pendiente por defecto
    return {
      status: 'pending',
      data: input.data,
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return { data: input.data }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: input.data }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return { data: { ...(input.data || {}), refunded_amount: input.amount } }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return { data: input.data }
  }

  async getWebhookActionAndData(payload: ProviderWebhookPayload['payload']): Promise<WebhookActionResult> {
    // Mapear eventos del webhook de MP a acciones de Medusa
    const eventType = (payload?.data as any)?.type || (payload as any)?.type
    switch (eventType) {
      case 'payment_authorized':
        return {
          action: 'authorized',
          data: {
            session_id: (payload?.data as any)?.metadata?.session_id || '',
            amount: (payload?.data as any)?.amount || 0,
          },
        }
      case 'payment_captured':
        return {
          action: 'captured',
          data: {
            session_id: (payload?.data as any)?.metadata?.session_id || '',
            amount: (payload?.data as any)?.amount || 0,
          },
        }
      case 'payment_canceled':
        return { action: 'canceled' as const }
      default:
        return { action: 'not_supported' }
    }
  }
}


