import { HttpTypes } from '@medusajs/types'

import { listProducts } from '@lib/data/products'

import { ProductView } from './product-view'

interface MainProductsProps {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}

export const MainProducts = async ({ collection, region }: MainProductsProps) => {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: '*variants.calculated_price',
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]'>
      {pricedProducts &&
        pricedProducts.map((product, index) => (
          <ProductView
            key={product.id}
            size={index === 0 ? 'full' : 'half'}
            item={product}
            priority={index !== 0}
          />
        ))}
    </section>
  )
}
