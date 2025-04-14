import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Logo } from "./logo"
import Search, { SearchSkeleton } from "./search"
import CartModal from "@modules/cart/components/modal/modal"
import { UserIcon } from "@heroicons/react/24/outline"

type Menu = {
  title: string
  path: string
}

export default async function Nav() {
  const menu: Menu[] = [
    { title: 'BOOSTERY', path: '/categories/boosters' },
    { title: 'ETB', path: '/categories/elite-trainer-boxes' },
  ]

  return (
    <div className="sticky top-0 inset-x-0 z-50 group bg-neutral-900">
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className='flex w-full items-center'>
          <div className='flex w-full md:w-1/3'>
            <LocalizedClientLink
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-10"
              data-testid="nav-store-link"
            >
              <Logo />
            </LocalizedClientLink>
            {menu.length ? (
              <ul className='hidden gap-6 text-sm md:flex md:items-center'>
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <LocalizedClientLink
                      href={item.path}
                      prefetch={true}
                      className='text-neutral-500 font-bold underline-offset-4 hover:text-black dark:text-neutral-300 dark:hover:text-white'
                    >
                      {item.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className='hidden justify-center md:flex md:w-1/3'>
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className='flex justify-end md:w-1/3'>
            <LocalizedClientLink
              className="p-3 mr-2 hover:text-pika-100"
              href="/account"
              data-testid="nav-account-link"
            >
              <UserIcon className="size-5" />
            </LocalizedClientLink>
            <CartModal />
          </div>
        </div>
      </nav>
    </div>
  )
}
