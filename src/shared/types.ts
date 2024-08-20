import { NoteInfo, NoteContent } from './models'

export type GetNotesType = () => Promise<NoteInfo[]>
export type ReadNotesType = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNotesType = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNoteType = () => Promise<NoteInfo['title'] | false>
export type DeleteNoteType=(title:NoteInfo['title'])=>Promise<boolean>
