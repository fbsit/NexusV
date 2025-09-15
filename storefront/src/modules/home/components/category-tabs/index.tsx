import { listCategories } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductCard from "./product-card"
import TabsClient from "./tabs-client"

export default async function CategoryTabs({
  countryCode,
}: {
  countryCode: string
}) {
  const [categories, region] = await Promise.all([
    listCategories(),
    getRegion(countryCode),
  ])

  if (!categories || !region) {
    return null
  }

  // Fetch top 5 products per category
  const categoriesWithProducts = await Promise.all(
    categories.map(async (cat) => {
      const { response } = await getProductsList({
        pageParam: 1,
        queryParams: {
          limit: 5,
          order: "created_at",
          // @ts-ignore - API expects array of ids
          category_id: [cat.id!],
        },
        countryCode,
      })

      return {
        id: cat.id!,
        name: cat.name!,
        products: response.products,
      }
    })
  )

  const nonEmpty = categoriesWithProducts.filter((c) => c.products.length > 0)

  if (nonEmpty.length === 0) {
    return null
  }

  return (
    <section id="categorias" className="py-12 pl-6 small:pl-12">
      <TabsClient tabs={nonEmpty.map((c) => c.name)}>
        {nonEmpty.map((c) => (
          <div key={c.id} className="mt-6">
            <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-5 gap-x-4 gap-y-6">
              {c.products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} region={region} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </TabsClient>
    </section>
  )
}


