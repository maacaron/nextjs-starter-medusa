'use client'

import { RadioGroup } from '@headlessui/react'
import { CheckCircleSolid } from '@medusajs/icons'
import { HttpTypes } from '@medusajs/types'
import { Button, Heading, Text, clx } from '@medusajs/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { setShippingMethod } from '@lib/data/cart'
import { convertToLocale } from '@lib/util/money'

import ErrorMessage from '@modules/checkout/components/error-message'
import Divider from '@modules/common/components/divider'
import Radio from '@modules/common/components/radio'

import { InPostBox } from './inpost-box'
import { InPostModal } from './inpost-modal'
import { InPostPoint } from './types'

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({ cart, availableShippingMethods }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPackageMachine, setSelectedPackageMachine] = useState<InPostPoint>()
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get('step') === 'delivery'

  const selectedShippingMethod = availableShippingMethods?.find(
    // To do: remove the previously selected shipping method instead of using the last one
    (method) => method.id === cart.shipping_methods?.at(-1)?.shipping_option_id
  )
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState(
    selectedShippingMethod?.id || ''
  )

  const [isPackageMachineModalOpen, setIsPackageMachineModalOpen] = useState(false)

  const handleEdit = () => {
    router.push(pathname + '?step=delivery', { scroll: false })
  }

  const handleSubmit = () => {
    if (selectedShippingMethod?.name.includes('Paczkomat') && !!selectedPackageMachine) {
      router.push(pathname + '?step=payment', { scroll: false })
    } else {
      setError('Proszę wybrać Paczkomat')
    }
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod({
      cartId: cart.id,
      shippingMethodId: id,
      packageMachine: selectedPackageMachine?.name,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDeliveryOptionChange = async (id: string) => {
    setSelectedShippingMethodId(id)
    const selectedOption = availableShippingMethods?.find((option) => option.id === id)
    if (selectedOption?.data?.id === 'inpost-fulfillment-parcel' && !selectedPackageMachine) {
      setIsPackageMachineModalOpen(true)
    } else {
      set(id)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  useEffect(() => {
    if (!!selectedPackageMachine) {
      set(selectedShippingMethodId)
    }
  }, [selectedPackageMachine])

  return (
    <div>
      <div className='flex flex-row items-center justify-between mb-6'>
        <Heading
          level='h2'
          className={clx('flex flex-row text-3xl-regular gap-x-2 items-baseline', {
            'opacity-50 pointer-events-none select-none':
              !isOpen && cart.shipping_methods?.length === 0,
          })}
        >
          Metody dostawy
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.shipping_address && cart?.billing_address && cart?.email && (
          <Text>
            <button
              onClick={handleEdit}
              className='text-ui-fg-interactive hover:text-ui-fg-interactive-hover'
              data-testid='edit-delivery-button'
            >
              Edycja
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <div data-testid='delivery-options-container'>
          <div className='pb-8'>
            <RadioGroup value={selectedShippingMethod?.id} onChange={handleDeliveryOptionChange}>
              {availableShippingMethods?.map((option) => {
                return (
                  <RadioGroup.Option
                    key={option.id}
                    value={option.id}
                    data-testid='delivery-option-radio'
                    className={clx(
                      'flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2',
                      {
                        'border-pika-100': option.id === selectedShippingMethod?.id,
                      }
                    )}
                  >
                    <div className='flex items-center gap-x-4'>
                      <Radio checked={option.id === selectedShippingMethod?.id} />
                      <div className='text-base-regular'>
                        <div>
                          {option.name}
                          {option.name.includes('Paczkomat') && <>&reg;</>}
                        </div>
                        {option.name.includes('Paczkomat') && (
                          <InPostBox
                            pointInfo={selectedPackageMachine}
                            setIsPackageMachineModalOpen={setIsPackageMachineModalOpen}
                          />
                        )}
                      </div>
                    </div>
                    <div className='justify-self-end text-ui-fg-base'>
                      {convertToLocale({
                        amount: option.amount!,
                        currency_code: cart?.currency_code,
                      })}
                    </div>
                  </RadioGroup.Option>
                )
              })}
            </RadioGroup>
          </div>
          <InPostModal
            isOpen={isPackageMachineModalOpen}
            setIsOpen={setIsPackageMachineModalOpen}
            setSelectedPackageMachine={setSelectedPackageMachine}
          />

          <ErrorMessage error={error} data-testid='delivery-option-error-message' />

          <Button
            size='large'
            className='mt-6'
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={!cart.shipping_methods?.[0]}
            data-testid='submit-delivery-option-button'
          >
            Przejdź do płatności
          </Button>
        </div>
      ) : (
        <div>
          <div className='text-small-regular'>
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className='flex flex-col w-1/3'>
                <Text className='txt-medium-plus text-ui-fg-base mb-1'>Wybrana dostawa:</Text>
                <Text className='txt-medium text-ui-fg-subtle'>
                  {!!selectedPackageMachine ? (
                    <InPostBox pointInfo={selectedPackageMachine} />
                  ) : (
                    `${selectedShippingMethod?.name} - `
                  )}
                  {convertToLocale({
                    amount: selectedShippingMethod?.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className='mt-8' />
    </div>
  )
}

export default Shipping
