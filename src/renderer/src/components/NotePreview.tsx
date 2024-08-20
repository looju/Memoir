import { notesMock } from '../store/mocks'
import { ComponentProps, forwardRef } from 'react'
import { NoteInfo } from '@shared/models'
import { cn } from '@renderer/utils'
import { dateFormatter } from '../utils/index'

export type NotePreviewProps = NoteInfo &
  ComponentProps<'div'> & {
    isActive?: boolean
  }
export const NotePreview = ({
  title,
  content,
  isActive = false,
  lastEdited,
  className,
  ...props
}: NotePreviewProps) => {
  const date = dateFormatter(lastEdited)
  return (
    <div
      {...props}
      className={cn(
        'cursor-pointer px-3 py-3 mr-2 rounded-md tranition-colors duration-100 ',
        {
          'bg-gray-900': isActive,
          'hover:bg-zinc-800': !isActive
        },
        className
      )}
    >
      <h3 className="mb-1 font-serif truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-extralight text-left">{date}</span>
    </div>
  )
}
