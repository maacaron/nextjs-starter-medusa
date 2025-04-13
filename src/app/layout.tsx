import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='pl' className='dark' data-mode='dark'>
      <body className='selection:bg-teal-300 bg-neutral-900 text-white dark:selection:bg-pink-500 dark:selection:text-white'>
        <main className='relative'>{props.children}</main>
      </body>
    </html>
  )
}
