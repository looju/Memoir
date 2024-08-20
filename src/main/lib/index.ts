import {fileEncoding, welcomeFileName } from '@shared/constants'
import { homedir } from 'os'
import fs from 'fs-extra'
import { NoteInfo } from '@shared/models'
import { GetNotesType, ReadNotesType, WriteNotesType, CreateNoteType } from '@shared/types'
import { dialog } from 'electron'
import path from 'path'
import { isEmpty } from 'lodash'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return String.raw`${homedir()}\Memoir`
}

export const getNotes: GetNotesType = async () => {
  const rootDir = getRootDir()
  await fs.ensureDir(rootDir)
  const notesFileNames = await fs.readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  if (isEmpty(notes)) {
    console.log('no notes found, creating welcome note')
    const content = await fs.readFile(welcomeNoteFile, { encoding: fileEncoding })

    // create dummy welcome note if there's no note in the directory
    await fs.writeFile(`${rootDir}/${welcomeFileName}`, content, { encoding: fileEncoding })
    notes.push(welcomeFileName)
  }
  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (filename: string): Promise<NoteInfo> => {
  const rootDir = getRootDir()
  const fileStats = await fs.stat(`${rootDir}/${filename}`)
  return {
    title: filename.replace(/\.md$/, ''),
    lastEdited: fileStats.mtimeMs
  }
}

export const readNotes: ReadNotesType = async (filename: String) => {
  const rootDir = getRootDir()
  return fs.readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNotes: WriteNotesType = (filename, content) => {
  const rootDir = getRootDir()
  return fs.writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNotes: CreateNoteType = async () => {
  const rootDir = getRootDir()
  await fs.ensureDir(rootDir)

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('Note creation canceled')
    return false
  }

  const { name, dir } = path.parse(filePath)

  if (dir !== rootDir) {
    console.log(dir, rootDir)
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation of file failed',
      message: `All notes must be saved under ${rootDir}. Please try again!`
    })
    return false
  }

  console.log(`Creating note ${name}`)
  await fs.writeFile(filePath, '') // empty initial file content

  return name // to be used as the title of the new note
}

export const deleteNotes = async (filename) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'], // 0 is delete, 1 is cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response == 1) {
    console.log('operation aborted')
    return false
  }

  //erase from disk
  await fs.remove(`${rootDir}/${filename}.md`)
  return true
}
