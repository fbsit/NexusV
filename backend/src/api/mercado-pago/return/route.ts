import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // Endpoint de retorno opcional para Mercado Pago. Solo confirma recepción.
  // El cierre real lo maneja el webhook.
  try {
    res.redirect(302, req.query?.redirect_url as string || '/')
  } catch {
    res.status(200).json({ ok: true })
  }
}


