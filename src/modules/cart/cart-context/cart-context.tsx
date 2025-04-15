'use client'

import { StoreCart, StoreProduct, StoreProductVariant } from '@medusajs/types/dist/http'
import React, { ReactNode, createContext, use, useContext, useMemo, useOptimistic } from 'react'

type CartContextType = {
  cart: Promise<StoreCart | null>
}

type UpdateType = 'plus' | 'minus' | 'delete'

type CartItem = {
  id: string
  variant_id?: string
  product_id?: string
  product_type_id?: string
  product_title?: string
  product_handle?: string
  quantity: number
}

type Cart = {
  id: string
  original_total: number
  item_total: number
  item_subtotal: number
  shipping_total: number
  items?: GenericItem[]
}

export type GenericCart<T = any> = {
  [key: string]: T
} & Cart

export type GenericItem<T = any> = {
  [key: string]: T
} & CartItem

interface CartProviderProps {
  children: ReactNode
  cart: Promise<StoreCart | null>
}

type CartAction =
  | {
      type: 'UPDATE_ITEM'
      payload: { variantId: string; updateType: UpdateType }
    }
  | {
      type: 'ADD_ITEM'
      payload: { variant: StoreProductVariant; product: StoreProduct }
    }

const CartContext = createContext<CartContextType | undefined>(undefined)

const createEmptyCart = <T extends GenericCart>(): T =>
  ({
    original_total: 0,
    item_total: 0,
    item_subtotal: 0,
    shipping_total: 0,
    items: [
      {
        variant_id: '',
        product_id: '',
        product_type_id: '',
        product_title: '',
        product_handle: '',
        quantity: 0,
      },
    ],
  }) as T

const calculateItemCost = (quantity: number, price: number): number => {
  return price * quantity
}

function updateCartItem(item: GenericItem, updateType: UpdateType): CartItem | null {
  if (updateType === 'delete') {
    return null
  }

  const newQuantity = updateType === 'plus' ? item.quantity + 1 : item.quantity - 1
  if (newQuantity === 0) {
    return null
  }

  return {
    ...item,
    quantity: newQuantity,
  }
}

const createOrUpdateCartItem = (
  existingItem: GenericItem | undefined,
  variant: StoreProductVariant,
  product: StoreProduct
) => {
  const quantity = existingItem ? existingItem.quantity + 1 : 1
  const totalAmount = calculateItemCost(quantity, variant?.calculated_price?.calculated_amount || 0)
  return existingItem
    ? {
        ...existingItem,
        total: totalAmount,
        quantity,
      }
    : {
        id: '',
        variant_id: variant.id,
        product_id: product.id,
        product_type_id: product.type_id,
        product_title: product.title,
        product_handle: product.handle,
        quantity,
      }
}

const cartReducer = (state: GenericCart | null, action: CartAction): GenericCart | null => {
  const currentCart = state || createEmptyCart()

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { variantId, updateType } = action.payload
      const updatedItems = (currentCart.items ?? [])
        .map((item: GenericItem) =>
          item.variant_id === variantId ? updateCartItem(item, updateType) : item
        )
        .filter(Boolean) as CartItem[]

      if (updatedItems.length === 0) {
        return {
          ...currentCart,
          items: [],
        }
      }

      return {
        ...currentCart,
        items: updatedItems,
      }
    }
    case 'ADD_ITEM': {
      const { variant, product } = action.payload
      const existingItem = currentCart?.items?.find(
        (item) => item?.product?.id === variant.product_id
      )
      const updatedItem = createOrUpdateCartItem(existingItem, variant, product)
      const updatedItems = existingItem
        ? currentCart?.items?.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        : [...(currentCart.items || []), updatedItem]

      const filteredItems = updatedItems?.filter((item) => {
        return !!item.product_id && !!item.variant_id
      })

      return {
        ...currentCart,
        items: filteredItems,
      } as GenericCart
    }
    default:
      return currentCart as GenericCart
  }
}

export const CartProvider = ({ children, cart }: CartProviderProps) => (
  <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  const initialCart = use(context.cart)
  const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer)

  const updateCartItem = (variantId: string, updateType: UpdateType) => {
    updateOptimisticCart({
      type: 'UPDATE_ITEM',
      payload: { variantId, updateType },
    })
  }

  const addCartItem = async (variant: StoreProductVariant, product: StoreProduct) => {
    updateOptimisticCart({ type: 'ADD_ITEM', payload: { variant, product } })
  }

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
    }),
    [optimisticCart]
  )
}
