'use server'

import { TAGS } from 'lib/constants'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { addToCart, deleteLineItem, retrieveCart, updateLineItem } from '@lib/data/cart'

// export async function addItem(prevState: any, selectedVariantId: string | undefined) {
//   const cart = await retrieveCart()

//   if (!cart || !selectedVariantId) {
//     return 'Error adding item to cart'
//   }

//   try {
//     await addToCart({
//       variantId: selectedVariantId,
//       quantity: 1,
//       countryCode: 'pl',
//     })
//     revalidateTag(TAGS.cart)
//   } catch (e) {
//     return 'Error adding item to cart'
//   }
// }

export async function removeItem(prevState: any, variantId: string) {
  try {
    const cart = await retrieveCart()

    if (!cart) {
      return 'Error fetching cart'
    }

    const itemToDelete = cart.items?.find((item: any) => item.variant_id === variantId)

    if (itemToDelete && itemToDelete.id) {
      await deleteLineItem(itemToDelete.id)
      revalidateTag(TAGS.cart)
    } else {
      return 'Item not found in cart'
    }
  } catch (e) {
    return 'Error removing item from cart'
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    variantId: string
    quantity: number
  }
) {
  const { variantId, quantity } = payload

  try {
    const cart = await retrieveCart()

    if (!cart) {
      return 'Error fetching cart'
    }

    const itemToUpdate = cart.items?.find((item) => item.variant_id === variantId)

    if (itemToUpdate && itemToUpdate.id) {
      if (quantity === 0) {
        await deleteLineItem(itemToUpdate.id)
      } else {
        await updateLineItem({
          lineId: itemToUpdate.id,
          quantity,
        })
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart({ variantId, quantity, countryCode: 'pl' })
    }

    revalidateTag(TAGS.cart)
  } catch (e) {
    console.error(e)
    return 'Error updating item quantity'
  }
}

export async function redirectToCheckout() {
  let cart = await retrieveCart()

  if (!cart) {
    return 'Error fetching cart'
  }

  redirect('/checkout?step=address')
}
