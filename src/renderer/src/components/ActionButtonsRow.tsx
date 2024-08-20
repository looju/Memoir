import { ComponentProps } from 'react'
import { NewNoteButton, DeleteButton, AudioButton } from './Button'

export const ActionButtonsRow = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props} className={className}>
      <NewNoteButton />
      <AudioButton />
      <DeleteButton />
    </div>
  )
}
