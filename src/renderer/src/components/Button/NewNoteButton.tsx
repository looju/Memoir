import { useSetAtom } from 'jotai'
import { FaBookMedical } from 'react-icons/fa6'
import { createEmptyNoteAtom } from '../../store'
import { ActionButton } from './ActionButton'
export const NewNoteButton = ({ ...props }) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton {...props} onClick={handleCreation}>
      <FaBookMedical className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
