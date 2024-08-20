import { GetNotesType, ReadNotesType, WriteNotesType, CreateNoteType, DeleteNoteType } from '@shared/types'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    context: {
      getNotes: GetNotesType
      readNotes: ReadNotesType
      writeNotes: WriteNotesType
      createNotes: CreateNoteType
      deleteNotes:DeleteNoteType
    }
  }
}
