import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const Price = ({
  amount,
  className,
  currencyCode = 'PLN',
  currencyCodeClassName,
  backgroundColor,
}: {
  amount: string
  className?: string
  currencyCode: string
  currencyCodeClassName?: string
  backgroundColor: string
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={twMerge(`${className} ${backgroundColor}`)}>
    {`${new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
    }).format(parseFloat(amount))}`}
    <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
  </p>
)

export default Price
