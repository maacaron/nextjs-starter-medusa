import { StoreCart } from '@medusajs/types'
import { Metadata } from 'next'

import { retrieveCart } from '@lib/data/cart'
import { getBaseURL } from '@lib/util/env'

import { CartProvider } from '@modules/cart/cart-context/cart-context'
import Footer from '@modules/layout/templates/footer'
import Nav from '@modules/layout/templates/nav'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const cart = retrieveCart()

  return (
    <CartProvider cart={cart}>
      <Nav />
      {props.children}
      <Footer />
    </CartProvider>
  )
}
