'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useActionState } from 'react'

import { GenericItem } from '../../cart-context/cart-context'
import { removeItem } from '../actions'

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: GenericItem
  optimisticUpdate: any
}) {
  const [message, formAction] = useActionState(removeItem, null)
  const removeItemAction = formAction.bind(null, item.variant_id)

  return (
    <form
      action={async () => {
        optimisticUpdate(item.variant_id, 'delete')
        removeItemAction()
      }}
    >
      <button
        type='submit'
        aria-label='Remove cart item'
        className='flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500'
      >
        <XMarkIcon className='mx-[1px] h-4 w-4 text-white dark:text-black' />
      </button>
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  )
}
