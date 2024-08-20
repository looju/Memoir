import { NoteContent, NoteInfo } from '@shared/models'
import { atom, SetStateAction } from 'jotai'
import { notesMock } from './mocks'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes.sort((a, b) => b.lastEdited - a.lastEdited) //get most recent note by last edit time
}

const notesAtomAsync = atom(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prevValues) => prevValues) // return previous values while async function is pending

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const index = get(selectedNoteIndexAtom)
  if (index === null || undefined) {
    return null
  }
  const selectedNote = notes[index] // would contain the title,last edited of the note at that index
  const noteContent = await window.context.readNotes(selectedNote.title)
  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEdited: Date.now()
    }
)

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote || !notes) return
  await window.context.writeNotes(selectedNote.title, newContent)
  //update the saved note's last edit time
  const updatedNote = notes.map((note) => {
    if (note.title === selectedNote.title) {
      return { ...note, lastEdited: Date.now() }
    }
    return note
  })
  set(notesAtom, updatedNote)
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return
  const title = await window.context.createNotes()
  if (!title) return
  const newNote = {
    title,
    lastEdited: Date.now()
  }
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]) // to return only notes with differing titles
  set(selectedNoteIndexAtom, 0) // to put the new note at the top of the array
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNotes(selectedNote.title)
  if (!isDeleted) return

  //filter out the deleted note
  const removeByItem = notes.filter((note) => note.title !== selectedNote?.title)
  set(notesAtom, removeByItem)
  set(selectedNoteIndexAtom, null)
})
