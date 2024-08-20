import { contextBridge, ipcRenderer } from 'electron'
import {
  GetNotesType,
  ReadNotesType,
  WriteNotesType,
  CreateNoteType,
  DeleteNoteType
} from '@shared/types'

contextBridge.exposeInMainWorld('context', {
  getNotes: (...args: Parameters<GetNotesType>) => ipcRenderer.invoke('getNotes', ...args),
  readNotes: (...args: Parameters<ReadNotesType>) => ipcRenderer.invoke('readNotes', ...args),
  writeNotes: (...args: Parameters<WriteNotesType>) => ipcRenderer.invoke('writeNotes', ...args),
  createNotes: (...args: Parameters<CreateNoteType>) => ipcRenderer.invoke('createNotes', ...args),
  deleteNotes: (...args: Parameters<DeleteNoteType>) => ipcRenderer.invoke('deleteNotes', ...args)
})
contextBridge.exposeInMainWorld('titleAPI', {
  setTitle: (title: string | null) => ipcRenderer.send('set-title', title)
})
