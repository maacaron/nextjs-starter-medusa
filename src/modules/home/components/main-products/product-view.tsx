import { CalculatedPriceSet, StoreProduct } from '@medusajs/types'
import Link from 'next/link'

import { GridTileImage } from '@modules/grid/tile'

interface ProductViewProps {
  item: StoreProduct
  size: 'full' | 'half'
  priority?: boolean
}

const getPriceColor = (calculatedPrice: CalculatedPriceSet) => {
  return calculatedPrice.calculated_amount === calculatedPrice.original_amount ? '' : 'bg-amber-500'
}

export const ProductView = ({ item, size, priority }: ProductViewProps) => {
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
