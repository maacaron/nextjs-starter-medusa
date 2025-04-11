'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { HttpTypes } from '@medusajs/types'
import Image from 'next/image'

import { GridTileImage } from '@modules/grid/tile'

import { useProduct, useUpdateURL } from '../product-context/product-context'

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const { state, updateImage } = useProduct()
  const updateURL = useUpdateURL()
  const imageIndex = state.image ? parseInt(state.image) : 0

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center'

  return (
    <form>
      <div className='relative aspect-square h-full max-h-[550px] w-full overflow-hidden'>
        {images[imageIndex] && (
          <Image
            className='h-full w-full object-contain p-16'
            fill
            sizes='(min-width: 1024px) 66vw, 100vw'
            alt={images[imageIndex]?.id as string}
            src={images[imageIndex]?.url as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className='absolute bottom-0 flex w-full justify-center'>
            <div className='mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80'>
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString())
                  updateURL(newState)
                }}
                aria-label='Previous product image'
                className={buttonClassName}
              >
                <ArrowLeftIcon className='h-5' />
              </button>
              <div className='mx-1 h-6 w-px bg-neutral-500'></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString())
                  updateURL(newState)
                }}
                aria-label='Next product image'
                className={buttonClassName}
              >
                <ArrowRightIcon className='h-5' />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className='bfdsgfsd my-12 flex items-center justify-center gap-2 py-1 lg:mb-0'>
          {images.map((image, index) => {
            const isActive = index === imageIndex

            return (
              <li key={image.url} className='h-20 w-20'>
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString())
                    updateURL(newState)
                  }}
                  aria-label='Wybierz zdjęcie produktu'
                  className='h-full w-full'
                >
                  <GridTileImage
                    alt={image.id}
                    src={image.url}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </form>
  )
}

export default ImageGallery
