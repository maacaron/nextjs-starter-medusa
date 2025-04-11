import clsx from 'clsx'

export const Price = ({
  className,
  quantity = 1,
  amount,
  currencyCode = 'PLN',
}: {
  className?: string
  quantity?: number
  amount: number
  currencyCode: string
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
    }).format(quantity * amount)}`}
  </p>
)
