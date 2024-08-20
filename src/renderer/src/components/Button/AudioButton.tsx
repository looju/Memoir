import { useAtom } from 'jotai'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'
import { selectedNoteAtom } from '../../store'
import { ActionButton } from './ActionButton'
import parse from 'html-react-parser'
import { useSpeech } from 'react-text-to-speech'
export const AudioButton = ({ ...props }) => {
  const [noteItems, _] = useAtom(selectedNoteAtom)
  const title = noteItems !== null ? noteItems.title.replaceAll('#*{}-_', '') : ''
  const content = noteItems !== null ? noteItems.content.replaceAll('#*{}-_', '') : ''
  const noteContent =
    noteItems?.content == undefined
      ? 'There is nothing available to read right now'
      : `The title is ${parse(title)}. ${parse(content)}`
  const { speechStatus, start, pause } = useSpeech({
    text: `${noteContent}`,
    pitch: 2,
    rate: 1,
    highlightText: true,
    voiceURI: [
      'Microsoft Zira - English (United States)',
      'Microsoft Susan - English (United States)',
      'Microsoft George - English (United States)',
      'Google UK English Female',
      'Google UK English Male'
    ]
  })

  return (
    <ActionButton {...props} onClick={speechStatus !== 'started' ? start : pause}>
      {speechStatus !== 'started' ? (
        <HiMiniSpeakerWave className="w-4 h-4 text-zinc-300" onClick={start} />
      ) : (
        <HiMiniSpeakerXMark className="w-4 h-4 text-zinc-300" onClick={pause} />
      )}
    </ActionButton>
  )
}
