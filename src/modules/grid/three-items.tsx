'use client'

import { CalculatedPriceSet, StoreCollection, StoreProduct, StoreRegion } from '@medusajs/types'
import Link from 'next/link'

import { getCollectionByHandle } from '@lib/data/collections'
import { getProductsList, listProducts } from '@lib/data/products'

import { PaginatedProductsParams } from '@modules/store/templates/paginated-products'

import { GridTileImage } from './tile'

const getPriceColor = (calculatedPrice: CalculatedPriceSet) => {
  return calculatedPrice.calculated_amount === calculatedPrice.original_amount ? '' : 'bg-amber-500'
}

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: StoreProduct
  size: 'full' | 'half'
  priority?: boolean
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className='relative block aspect-square h-full w-full'
        href={`/products/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item?.images?.[0].url || ''}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: (item?.variants?.[0]?.calculated_price?.calculated_amount || 0).toString(),
            currencyCode: item?.variants?.[0]?.calculated_price?.currency_code || 'PLN',
            backgroundColor: getPriceColor(
              item?.variants?.[0]?.calculated_price as CalculatedPriceSet
            ),
          }}
          additionalClassName='p-24'
        />
      </Link>
    </div>
  )
}

interface ThreeItemGridProps {
  homePageCollection: StoreCollection,
  region: StoreRegion
}

export async function ThreeItemGrid({ homePageCollection, region }: ThreeItemGridProps) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: homePageCollection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]'>
      {pricedProducts.map((product: StoreProduct, index: number) => {
        return (
          <ThreeItemGridItem
            key={product.id}
            size={index === 0 ? 'full' : 'half'}
            item={product}
            priority={index !== 0}
          />
        )
      }
      )}
    </section>
  )
}
