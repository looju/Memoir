import React from 'react'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  imagePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  InsertImage,
  ListsToggle,
  MDXEditorMethods
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const ref = React.useRef<MDXEditorMethods>(null)
  const { selectedNote, editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor()
  if (selectedNote == null) {
    return null
  }
  return (
    <MDXEditor
      ref={editorRef}
      markdown={selectedNote.content}
      key={selectedNote.title}
      className="dark-theme dark-editor"
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        imagePlugin({
          disableImageSettingsButton: true,
          disableImageResize: true,
          imagePreviewHandler: (result) => {
            console.log(result, 'image result')
          }
        }),
        markdownShortcutPlugin(),
        quotePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <InsertImage />
              <ListsToggle />
            </>
          )
        })
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
