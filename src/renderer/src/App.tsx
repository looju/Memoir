import { RootLayout, SideBar, Content, NotePreviewList, FloatingNoteTitle } from './components'
import { ActionButtonsRow } from './components/ActionButtonsRow'
import { MarkdownEditor } from './components/MarkdownEditor'
import { useRef } from 'react'

function App(): JSX.Element {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0,0)
  }
  return (
    <>
      <RootLayout>
        <SideBar className="p-2 bg-emerald-900">
          <ActionButtonsRow className="flex mt-1 justify-between" />
          <NotePreviewList className="mt-3 space-y" onSelect={resetScroll}/>
        </SideBar>
        <Content ref={contentContainerRef} className="border-l border-l-white">
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
