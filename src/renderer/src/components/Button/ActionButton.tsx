import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
export const ActionButton = ({ children, className, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      {...props}
      className={twMerge(
        'px-2 py-1 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 active:bg-zinc-200 transition-colors duration-150',
        className
      )}
    >
      {children}
    </button>
  )
}
