'use client'

import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
// import LoadingDots from 'components/loading-dots'
// import Price from 'components/price'
// import { DEFAULT_OPTION } from 'lib/constants'
// import { createUrl } from 'lib/utils'
// import Image from 'next/image'
// import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

// import { createCartAndSetCookie, redirectToCheckout } from './actions'
import { useCart } from '../../cart-context/cart-context'
import { redirectToCheckout } from '../actions'
import { DeleteItemButton } from './delete-item-button'
import { EditItemQuantityButton } from './edit-item-quantity-button'
import { LoadingDots } from './loading-dots'
// import { DeleteItemButton } from './delete-item-button'
// import { EditItemQuantityButton } from './edit-item-quantity-button'
import OpenCart from './open-cart'
import { Price } from './price'

type MerchandiseSearchParams = {
  [key: string]: string
}

export default function CartModal() {
  const { cart, updateCartItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  const quantityRef = useRef(totalQuantity)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  // useEffect(() => {
  //   if (!cart) {
  //     createCartAndSetCookie();
  //   }
  // }, [cart]);

  //   useEffect(() => {
  //     if (
  //       cart?.totalQuantity &&
  //       cart?.totalQuantity !== quantityRef.current &&
  //       cart?.totalQuantity > 0
  //     ) {
  //       if (!isOpen) {
  //         setIsOpen(true);
  //       }
  //       quantityRef.current = cart?.totalQuantity;
  //     }
  //   }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label='Open cart' onClick={openCart}>
        <OpenCart quantity={totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className='relative z-50'>
          <Transition.Child
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='opacity-0 backdrop-blur-none'
            enterTo='opacity-100 backdrop-blur-[.5px]'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='opacity-100 backdrop-blur-[.5px]'
            leaveTo='opacity-0 backdrop-blur-none'
          >
            <div className='fixed inset-0 bg-black/40' aria-hidden='true' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <Dialog.Panel className='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black md:w-[390px] dark:border-neutral-700 dark:border-l-pika-100 dark:bg-black dark:text-white'>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold'>Koszyk</p>
                <button aria-label='Close cart' onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart?.items?.length === 0 ? (
                <div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
                  <ShoppingCartIcon className='h-16' />
                  <p className='mt-6 text-center text-2xl font-bold'>Twój koszyk jest pusty.</p>
                </div>
              ) : (
                <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
                  <ul className='grow overflow-auto py-4'>
                    {cart?.items?.map((item, i) => {
                      const productUrl = `/products/${item.product_handle}`

                      return (
                        <li
                          key={i}
                          className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'
                        >
                          <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                            <div className='absolute z-40 -ml-1 -mt-2'>
                              <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                            </div>
                            <div className='flex flex-row mr-2'>
                              <div className='relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
                                <Link href={productUrl} onClick={closeCart}>
                                  <Image
                                    className='h-full w-full object-cover'
                                    width={64}
                                    height={64}
                                    alt={item.product_title || ''}
                                    src={item.thumbnail}
                                  />
                                </Link>
                              </div>
                              <Link
                                href={productUrl}
                                onClick={closeCart}
                                className='z-30 ml-2 flex flex-row space-x-4'
                              >
                                <div className='flex flex-1 flex-col text-base'>
                                  <span className='leading-tight'>{item.product_title}</span>
                                  {!!item.variant_title &&
                                    !item.variant_title.includes(item.product_title) && (
                                      <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                                        {item.variant_title}
                                      </p>
                                    )}
                                </div>
                              </Link>
                            </div>
                            <div className='flex h-16 flex-col justify-between'>
                              <Price
                                className='flex justify-end space-y-2 text-right text-sm'
                                quantity={item.quantity}
                                amount={item.unit_price}
                                currencyCode={cart.currencyCode}
                              />
                              <div className='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
                                <EditItemQuantityButton
                                  item={item}
                                  type='minus'
                                  optimisticUpdate={updateCartItem}
                                />
                                <p className='w-6 text-center'>
                                  <span className='w-full text-sm'>{item.quantity}</span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type='plus'
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <div className='py-4 text-sm text-neutral-500 dark:text-neutral-400'>
                    <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
                      <p>Dostawa</p>
                      <p className='text-right'>od 0,00 zł</p>
                    </div>
                    <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
                      <p>Łącznie</p>
                      <Price
                        className='text-right text-base text-black dark:text-white'
                        amount={cart.item_total}
                        currencyCode={cart.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout}>
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

const CloseCart = ({ className }: { className?: string }) => (
  <div className='relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white'>
    <XMarkIcon className={clsx('h-6 transition-all ease-in-out hover:scale-110', className)} />
  </div>
)

const CheckoutButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      className='block w-full rounded-full bg-pika-100 p-3 text-center text-sm font-medium text-black opacity-90 hover:bg-pika-30'
      type='submit'
      disabled={pending}
    >
      {pending ? <LoadingDots className='bg-white' /> : 'Przejdź do kasy'}
    </button>
  )
}
