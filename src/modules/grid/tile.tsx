import clsx from 'clsx'
import Image from 'next/image'

import Label from './label'

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  additionalClassName,
  ...props
}: {
  isInteractive?: boolean
  active?: boolean
  label?: {
    title: string
    amount: string
    currencyCode: string
    position?: 'bottom' | 'center'
    backgroundColor: string
  }
  additionalClassName?: string
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-black hover:border-pika-100 dark:hover:border-pika-100',
        {
          relative: label,
          'border-2 border-pika-100': active,
          'border-neutral-200 dark:border-neutral-800': !active,
        },
        {
          'hover:border-pika-100': isInteractive,
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx(
            'relative h-full w-full object-contain',
            {
              'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
            },
            additionalClassName
          )}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          backgroundColor={label.backgroundColor}
        />
      ) : null}
    </div>
  )
}
