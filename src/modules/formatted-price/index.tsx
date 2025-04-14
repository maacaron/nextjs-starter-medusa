import { twMerge } from 'tailwind-merge'
import { VariantPrice } from 'types/global'

interface FormattedPriceProps {
  isOriginal: boolean
  selectedPrice: VariantPrice
  isPromo?: boolean
}

export const FormattedPrice = ({
  isOriginal,
  selectedPrice,
  isPromo = false,
}: FormattedPriceProps) => (
  <span
    data-testid={isOriginal ? 'original-product-price' : 'product-price'}
    data-value={
      isOriginal ? selectedPrice.original_price_number : selectedPrice.calculated_price_number
    }
    className={twMerge(
      `w-auto rounded-full p-2 text-m text-white ${
        isOriginal ? 'bg-gray-600 line-through' : 'bg-pika-100 text-black'
      } ${isPromo ? 'bg-amber-500 text-white' : ''}`
    )}
  >
    {`${new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: selectedPrice.currency_code,
      currencyDisplay: 'narrowSymbol',
    }).format(
      parseFloat(
        isOriginal
          ? selectedPrice.original_price_number.toString()
          : selectedPrice.calculated_price_number.toString()
      )
    )}`}
    <span className='ml-1 hidden @[275px]/label:inline'>{selectedPrice.currency_code}</span>
  </span>
)
