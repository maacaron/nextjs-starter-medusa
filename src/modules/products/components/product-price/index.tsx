import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { FormattedPrice } from "@modules/formatted-price"
import { LowestPrice } from "@modules/lowest-price"
import { useEffect, useState } from "react"
import { getPriceHistory } from "middleware"

interface ProductPriceProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  variant?: HttpTypes.StoreProductVariant
}

type PriceHistoryType = {
  id: string
  currency_code: string
  amount: number
  raw_amount: Record<string, string>
  created_at: Date
}

const getLowestProductPrice = (productPrices: PriceHistoryType[]) => {
  let lowestPrice

  if (productPrices.length) {
    lowestPrice = productPrices?.reduce((lowest, price) =>
      parseFloat(price.raw_amount.value) < parseFloat(lowest.raw_amount.value) ? price : lowest
    )

    return lowestPrice.amount
  }

  return 0
}

export default function ProductPrice({
  product,
  variant,
  region,
}: ProductPriceProps) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const [lowestPrice, setLowestPrice] = useState(0)

  useEffect(() => {
    getPriceHistory(product.id, region.id)
      .then((res) => res.json())
      .then((data) => {
        setLowestPrice(getLowestProductPrice(data[0].price_histories))
      })
  }, [])

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <>
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx("text-xl-semi", {
          "text-ui-fg-interactive": selectedPrice.price_type === "sale",
        })}
      >
        <FormattedPrice
            isOriginal={false}
            selectedPrice={selectedPrice}
            isPromo={selectedPrice.price_type === 'sale'}
          />
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
        <span
          className={clx('mr-2', {
            'text-ui-fg-interactive': selectedPrice.price_type === 'sale',
          })}
        >
          <FormattedPrice isOriginal selectedPrice={selectedPrice} />
        </span>
        <span className='w-auto rounded-full p-2 text-m text-white bg-red-600'>
          -{selectedPrice.percentage_diff}%
        </span>
      </>
      )}
    </div>
    <LowestPrice lowestPrice={lowestPrice} currencyCode={selectedPrice.currency_code} />
    </>
  )
}
