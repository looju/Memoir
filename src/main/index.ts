import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getNotes, readNotes, writeNotes, createNotes, deleteNotes } from './lib'
import {
  CreateNoteType,
  DeleteNoteType,
  GetNotesType,
  ReadNotesType,
  WriteNotesType
} from '@shared/types'

let mainWindow

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    center: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'default',
    trafficLightPosition: { x: 15, y: 10 },
    backgroundColor: process.platform !== 'darwin' ? 'rgba(0,0,0,1)' : 'null',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      devTools: true,
      nodeIntegration: true
    }
  })
  mainWindow.loadFile(join(__dirname, '../renderer/index.html')).catch((e) => {
    console.log('error loading file: ' + e)
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotesType>) => getNotes(...args))
  ipcMain.handle('readNotes', (_, ...args: Parameters<ReadNotesType>) => readNotes(...args))
  ipcMain.handle('writeNotes', (_, ...args: Parameters<WriteNotesType>) => writeNotes(...args))
  ipcMain.handle('createNotes', (_, ...args: Parameters<CreateNoteType>) => createNotes(...args))
  ipcMain.handle('deleteNotes', (_, ...args: Parameters<DeleteNoteType>) => deleteNotes(...args))
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('set-title', (_, title) => {
  if (title == null || title == undefined) {
    mainWindow.setTitle('Memoir')
  }
  mainWindow.setTitle(`Now reading: ${title}`)
})
