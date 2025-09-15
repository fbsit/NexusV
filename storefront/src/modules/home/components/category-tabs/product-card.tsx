import { Text, Badge } from "@medusajs/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import { getProductsById } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import QuickAdd from "./quick-add"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default async function ProductCard({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) return null

  const { cheapestPrice } = getProductPrice({ product: pricedProduct })

  return (
    <div className="group rounded-lg border border-ui-border-base bg-ui-bg-base overflow-hidden">
      <div className="relative">
        {cheapestPrice?.price_type === "sale" && (
          <div className="absolute top-3 left-3 z-10">
            <Badge color="green">Oferta</Badge>
          </div>
        )}
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={false}
          />
        </LocalizedClientLink>
      </div>
      <div className="px-3 py-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Text className="text-ui-fg-subtle line-clamp-2" data-testid="product-title">
            {product.title}
          </Text>
          {cheapestPrice && (
            <div className="flex flex-col items-end">
              {cheapestPrice.price_type === "sale" && (
                <Text className="text-xs line-through text-ui-fg-muted">
                  {cheapestPrice.original_price}
                </Text>
              )}
              <Text className="text-ui-fg-base font-medium">
                {cheapestPrice.calculated_price}
              </Text>
            </div>
          )}
        </div>
        <QuickAdd product={pricedProduct} region={region} />
      </div>
    </div>
  )
}


