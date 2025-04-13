interface LowestPriceProps {
  lowestPrice: number
  currencyCode: string
}

export const LowestPrice = ({ lowestPrice, currencyCode }: LowestPriceProps) => {
  return (
    <div
      data-testid='lowest-price'
      data-value={lowestPrice}
      className='text-xs mt-3 w-auto rounded-full text-m text-white'
    >
      <span>Najniższa cena z ostatnich 30 dni: </span>
      {`${new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      }).format(lowestPrice)}`}
      <span className='hidden @[275px]/label:inline'>{currencyCode}</span>
    </div>
  )
}
