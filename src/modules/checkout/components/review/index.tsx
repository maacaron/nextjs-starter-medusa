'use client'

import { Heading, Text, clx } from '@medusajs/ui'
import { useSearchParams } from 'next/navigation'

import PaymentButton from '../payment-button'

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get('step') === 'review'

  const paidByGiftcard = cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div>
      <div className='flex flex-row items-center justify-between mb-6'>
        <Heading
          level='h2'
          className={clx('flex flex-row text-3xl-regular gap-x-2 items-baseline', {
            'opacity-50 pointer-events-none select-none': !isOpen,
          })}
        >
          Podsumowanie
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className='flex items-start gap-x-1 w-full mb-6'>
            <div className='w-full'>
              <Text className='txt-medium-plus text-ui-fg-base mb-1'>
                Klikając przycisk 'Złóż zamówienie', potwierdzasz, że zapoznałeś(-aś) się z naszym
                Regulaminem, Polityką Prywatności oraz Warunkami Sprzedaży, i akceptujesz ich treść.
                Wyrażasz również zgodę na przetwarzanie Twoich danych osobowych w celu realizacji
                zamówienia.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid='submit-order-button' />
        </>
      )}
    </div>
  )
}

export default Review
