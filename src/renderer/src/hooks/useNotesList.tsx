import { notesAtom, selectedNoteIndexAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'

type onSelect = {
  onSelect?: () => void
}

export const useNotesList = ({ onSelect }: onSelect) => {
  const notes = useAtomValue(notesAtom)
  const [index, setIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = (index: number) =>  {
    setIndex(index)
    if (onSelect) {
      onSelect()
    }
  }
  return {
    notes,
    index,
    handleNoteSelect
  }
}
