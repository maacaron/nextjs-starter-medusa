import { Metadata } from 'next'

import { getCollectionsWithProducts } from '@lib/data/collections'
import { getRegion } from '@lib/data/regions'

import { ThreeItemGrid } from '@modules/grid/three-items'
import FeaturedProducts from '@modules/home/components/featured-products'

export const metadata: Metadata = {
  title: 'Medusa Next.js Starter Template',
  description: 'A performant frontend ecommerce starter template with Next.js 14 and Medusa.',
}

export default async function Home(
  props: {
    params: Promise<{ countryCode: string }>
  }
) {
  const params = await props.params;

  const {
    countryCode
  } = params;

  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <ThreeItemGrid />
    </>
  )
}
