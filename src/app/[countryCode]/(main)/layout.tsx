import { StoreCartShippingOption } from '@medusajs/types'
import { Metadata } from 'next'

import { listCartOptions, retrieveCart } from '@lib/data/cart'
import { retrieveCustomer } from '@lib/data/customer'
import { getBaseURL } from '@lib/util/env'

// import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import { CartProvider } from '@modules/cart/cart-context/cart-context'
// import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from '@modules/layout/templates/footer'
import Nav from '@modules/layout/templates/nav'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  // if (cart) {
  //   const { shipping_options } = await listCartOptions()

  //   shippingOptions = shipping_options
  // }

  return (
    <>
      <CartProvider cart={cart}>
        <Nav />
        {/* FIXME: sprawdzić CartMismatchBanner i FreeShippingPriceNudge */}
        {/* {customer && cart && (
          <CartMismatchBanner customer={customer} cart={cart} />
        )} */}

        {/* {cart && (
          <FreeShippingPriceNudge
            variant="popup"
            cart={cart}
            shippingOptions={shippingOptions}
          />
        )} */}
        {props.children}
        <Footer />
      </CartProvider>
    </>
  )
}
