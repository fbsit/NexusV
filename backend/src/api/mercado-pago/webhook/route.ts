import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const paymentModule = req.scope.resolve(Modules.PAYMENT)
    const result = await paymentModule.getWebhookActionAndData({
      provider_id: 'mercadopago',
      payload: {
        data: req.body,
        rawData: req.body,
        headers: req.headers as any,
      },
    } as any)

    // Medusa maneja internamente la acción (authorized/captured/canceled)
    res.status(200).json({ received: true, action: result.action })
  } catch (e: any) {
    res.status(200).json({ received: true })
  }
}


