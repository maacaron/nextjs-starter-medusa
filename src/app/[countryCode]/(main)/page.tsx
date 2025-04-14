import { StoreCollection } from '@medusajs/types'
import { Metadata } from 'next'

import { getCollectionByHandle, listCollections } from '@lib/data/collections'
import { getRegion } from '@lib/data/regions'

import { MainProducts } from '@modules/home/components/main-products'

export const metadata: Metadata = {
  title: 'pika space',
  description: 'Twoja przestrzeń z produktami Pokémon',
}

export default async function Home(props: { params: Promise }) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: 'id, handle, title',
  })

  const handle = 'homepage-featured-items'

  const homePageCollection = await getCollectionByHandle(handle).then(
    (collection: StoreCollection) => collection
  )

  if (!homePageCollection) {
    return null
  }

  if (!collections || !region) {
    return null
  }

  return <MainProducts collection={homePageCollection} region={region} />
}
