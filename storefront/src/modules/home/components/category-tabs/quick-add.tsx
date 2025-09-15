"use client"

import { Button } from "@medusajs/ui"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

export default function QuickAdd({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const countryCode = useParams().countryCode as string
  const [isAdding, setIsAdding] = useState(false)

  const firstVariant = useMemo(() => product.variants?.[0], [product.variants])
  const inStock = useMemo(() => {
    if (!firstVariant) return false
    if (!firstVariant.manage_inventory) return true
    if (firstVariant.allow_backorder) return true
    return (firstVariant.inventory_quantity || 0) > 0
  }, [firstVariant])

  const handleAdd = async () => {
    if (!firstVariant?.id) return
    setIsAdding(true)
    await addToCart({ variantId: firstVariant.id, quantity: 1, countryCode })
    setIsAdding(false)
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={!inStock}
      isLoading={isAdding}
      variant="primary"
      className="w-full h-9"
    >
      {inStock ? "Agregar" : "Sin stock"}
    </Button>
  )
}


