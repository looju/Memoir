import { MdDelete } from 'react-icons/md'
import { useSetAtom } from 'jotai'
import { deleteNoteAtom } from '../../store'
import { ActionButton } from './ActionButton'
export const DeleteButton = ({ ...props }) => {
  const deleteNote = useSetAtom(deleteNoteAtom)
  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <ActionButton {...props} onClick={handleDelete}>
      <MdDelete className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
