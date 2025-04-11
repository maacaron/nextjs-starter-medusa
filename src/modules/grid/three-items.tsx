'use client'

import { CalculatedPriceSet, StoreProduct } from '@medusajs/types'
import axios from 'axios'
import Link from 'next/link'

import { getCollectionByHandle } from '@lib/data/collections'
import { getProductsList } from '@lib/data/products'

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
          // @ts-expect-error
          src={item.images[0].url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            // amount: '18.99', //item.priceRange.maxVariantPrice.amount,
            amount: (item?.variants?.[0]?.calculated_price?.calculated_amount || 0).toString(),
            currencyCode: item?.variants?.[0]?.calculated_price?.currency_code || 'PLN',
            // currencyCode: 'PLN', //item.priceRange.maxVariantPrice.currencyCode,
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

export async function ThreeItemGrid() {
  const queryParams: PaginatedProductsParams = {
    limit: 3,
  }
  const handle = 'homepage-featured-items'
  const countryCode = 'pl'
  const collection = await getCollectionByHandle(handle)

  if (!collection) {
    return null
  }

  queryParams['collection_id'] = [collection.id]
  let {
    response: { products, count },
  } = await getProductsList({
    pageParam: 0,
    queryParams,
    countryCode,
  })

  if (!products[0] || !products[1] || !products[2]) {
    return null
  }

  const [firstProduct, secondProduct, thirdProduct] = products

  return (
    <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]'>
      <ThreeItemGridItem size='full' item={thirdProduct} />
      <ThreeItemGridItem size='half' item={firstProduct} priority={true} />
      <ThreeItemGridItem size='half' item={secondProduct} priority={true} />
    </section>
  )
}
