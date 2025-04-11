'use client'

import { InformationCircleSolid } from '@medusajs/icons'
import { Tooltip } from '@medusajs/ui'
import React from 'react'

import { convertToLocale } from '@lib/util/money'

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    original_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    subtotal,
    original_total,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
  } = totals

  return (
    <div>
      <div className='flex flex-col gap-y-2 txt-medium text-ui-fg-subtle '>
        <div className='flex items-center justify-between'>
          <span className='flex gap-x-1 items-center'>Łącznie</span>
          <span data-testid='cart-subtotal' data-value={subtotal || 0}>
            {convertToLocale({ amount: original_total ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className='flex items-center justify-between'>
            <span>Rabaty</span>
            <span
              className='text-ui-fg-interactive'
              data-testid='cart-discount'
              data-value={discount_total || 0}
            >
              - {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className='flex items-center justify-between'>
          <span>Dostawa</span>
          <span data-testid='cart-shipping' data-value={shipping_total || 0}>
            {convertToLocale({ amount: shipping_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className='h-px w-full border-b border-gray-200 my-4' />
      <div className='flex items-center justify-between text-ui-fg-base mb-2 txt-medium '>
        <span>Razem</span>
        <span className='txt-xlarge-plus' data-testid='cart-total' data-value={total || 0}>
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      <div className='h-px w-full border-b border-gray-200 mt-4' />
    </div>
  )
}

export default CartTotals
