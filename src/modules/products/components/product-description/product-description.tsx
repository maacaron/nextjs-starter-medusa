'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { HttpTypes } from '@medusajs/types'
import clsx from 'clsx'
import { isEqual } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

// import { AddToCart } from '@modules/cart/components/add-to-cart/add-to-cart'
import Prose from '@modules/prose'

import ProductPrice from '../product-price'

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const optionsAsKeymap = (variantOptions: HttpTypes.StoreProductVariant['options']) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export function ProductDescription({ product, region }: ProductTemplateProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  return (
    <>
      <div className='mb-6 flex flex-col border-b pb-6 dark:border-neutral-700'>
        <h1 className='mb-2 text-4xl font-medium'>{product.title}</h1>
        <div className='mt-2'>
          <ProductPrice product={product} variant={selectedVariant} region={region} />
        </div>
      </div>
      {product.description ? (
        <Prose
          className='mb-6 text-sm leading-tight dark:text-white/[70%]'
          html={product.description}
        />
      ) : null}
    </>
  )
}
