import { notesMock } from '../store/mocks'
import { ComponentProps, forwardRef } from 'react'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@renderer/hooks/useNotesList'
import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '@renderer/store'
import { isEmpty } from 'lodash'

export type NotePreviewListProp = {
  onSelect?: () => void
} & ComponentProps<'ul'>

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProp) => {
  const { notes, index, handleNoteSelect } = useNotesList({ onSelect })
  if (!notes) return null
  if (isEmpty(notes)) {
    return (
      <ul className={twMerge('text-center p-4 mt-24', className)} {...props}>
        <span>No notes yet!</span>
      </ul>
    )
  }
  //const browserWindowTitle = useAtomValue(selectedNoteAtom)
  return (
    <ul {...props}>
      {notes.map((note, indexVal) => (
        <NotePreview
          title={note.title}
          lastEdited={note.lastEdited}
          key={note.lastEdited + note.title}
          onClick={() => handleNoteSelect(indexVal)}
          isActive={indexVal == index ? true : false}
        />
      ))}
    </ul>
  )
}
