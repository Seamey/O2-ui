// import * as React from 'react'
// import type { Editor } from '@tiptap/react'
// import type { Content, UseEditorOptions } from '@tiptap/react'
// import { StarterKit } from '@tiptap/starter-kit'
// import { useEditor } from '@tiptap/react'
// import { Typography } from '@tiptap/extension-typography'
// import { Placeholder } from '@tiptap/extension-placeholder'
// import { Underline } from '@tiptap/extension-underline'
// import { TextStyle } from '@tiptap/extension-text-style'
// import {
//   Link,
//   Image,
//   HorizontalRule,
//   CodeBlockLowlight,
//   Selection,
//   Color,
//   UnsetAllMarks,
//   ResetMarksOnEnter,
//   FileHandler
// } from '../Components/texteditor/extensions'
// import { cn } from '@/lib/utils'
// import { fileToBase64, getOutput, randomId } from '../Components/texteditor/utils'
// import { useThrottle } from '../hooks/use-throttle'
// import { toast } from 'sonner'

// export interface UseMinimalTiptapEditorProps extends UseEditorOptions {
//   value?: Content
//   output?: 'html' | 'json' | 'text'
//   placeholder?: string
//   editorClassName?: string
//   throttleDelay?: number
//   onUpdate?: (content: Content) => void
//   onBlur?: (content: Content) => void
// }

// const createExtensions = (placeholder: string) => [
//   StarterKit.configure({
//     horizontalRule: false,
//     codeBlock: false,
//     paragraph: { HTMLAttributes: { class: 'text-node' } },
//     heading: { HTMLAttributes: { class: 'heading-node' } },
//     blockquote: { HTMLAttributes: { class: 'block-node' } },
//     bulletList: { HTMLAttributes: { class: 'list-node' } },
//     orderedList: { HTMLAttributes: { class: 'list-node' } },
//     code: { HTMLAttributes: { class: 'inline', spellcheck: 'false' } },
//     dropcursor: { width: 2, class: 'ProseMirror-dropcursor border' }
//   }),
//   Link,
//   Underline,
//   Image.configure({
//     allowedMimeTypes: ['image/*'],
//     maxFileSize: 5 * 1024 * 1024,
//     allowBase64: true,
//     uploadFn: async file => {
//       // NOTE: This is a fake upload function. Replace this with your own upload logic.
//       // This function should return the uploaded image URL.

//       // wait 3s to simulate upload
//       await new Promise(resolve => setTimeout(resolve, 3000))

//       const src = await fileToBase64(file)

//       // either return { id: string | number, src: string } or just src
//       // return src;
//       return { id: randomId(), src }
//     },
//     onToggle(editor, files, pos) {
//       editor.commands.insertContentAt(
//         pos,
//         files.map(image => {
//           const blobUrl = URL.createObjectURL(image)
//           const id = randomId()

//           return {
//             type: 'image',
//             attrs: {
//               id,
//               src: blobUrl,
//               alt: image.name,
//               title: image.name,
//               fileName: image.name
//             }
//           }
//         })
//       )
//     },
//     onImageRemoved({ id, src }) {
//       console.log('Image removed', { id, src })
//     },
//     onValidationError(errors) {
//       errors.forEach(error => {
//         toast.error('Image validation error', {
//           position: 'bottom-right',
//           description: error.reason
//         })
//       })
//     },
//     onActionSuccess({ action }) {
//       const mapping = {
//         copyImage: 'Copy Image',
//         copyLink: 'Copy Link',
//         download: 'Download'
//       }
//       toast.success(mapping[action], {
//         position: 'bottom-right',
//         description: 'Image action success'
//       })
//     },
//     onActionError(error, { action }) {
//       const mapping = {
//         copyImage: 'Copy Image',
//         copyLink: 'Copy Link',
//         download: 'Download'
//       }
//       toast.error(`Failed to ${mapping[action]}`, {
//         position: 'bottom-right',
//         description: error.message
//       })
//     }
//   }),
//   FileHandler.configure({
//     allowBase64: true,
//     allowedMimeTypes: ['image/*'],
//     maxFileSize: 5 * 1024 * 1024,
//     onDrop: (editor, files, pos) => {
//       files.forEach(async file => {
//         const src = await fileToBase64(file)
//         editor.commands.insertContentAt(pos, {
//           type: 'image',
//           attrs: { src }
//         })
//       })
//     },
//     onPaste: (editor, files) => {
//       files.forEach(async file => {
//         const src = await fileToBase64(file)
//         editor.commands.insertContent({
//           type: 'image',
//           attrs: { src }
//         })
//       })
//     },
//     onValidationError: errors => {
//       errors.forEach(error => {
//         toast.error('Image validation error', {
//           position: 'bottom-right',
//           description: error.reason
//         })
//       })
//     }
//   }),
//   Color,
//   TextStyle,
//   Selection,
//   Typography,
//   UnsetAllMarks,
//   HorizontalRule,
//   ResetMarksOnEnter,
//   CodeBlockLowlight,
//   Placeholder.configure({ placeholder: () => placeholder })
// ]

// export const useMinimalTiptapEditor = ({
//   value,
//   output = 'json',
//   placeholder = '',
//   editorClassName,
//   throttleDelay = 0,
//   onUpdate,
//   onBlur,
//   ...props
// }: UseMinimalTiptapEditorProps) => {
//   const throttledSetValue = useThrottle((value: Content) => onUpdate?.(value), throttleDelay)

//   const handleUpdate = React.useCallback(
//     (editor: Editor) => throttledSetValue(getOutput(editor, output)),
//     [output, throttledSetValue]
//   )

//   const handleCreate = React.useCallback(
//     (editor: Editor) => {
//       if (value && editor.isEmpty) {
//         editor.commands.setContent(value)
//       }
//     },
//     [value]
//   )

//   const handleBlur = React.useCallback((editor: Editor) => onBlur?.(getOutput(editor, output)), [output, onBlur])

//   const editor = useEditor({
//     extensions: createExtensions(placeholder),
//     editorProps: {
//       attributes: {
//         autocomplete: 'off',
//         autocorrect: 'off',
//         autocapitalize: 'off',
//         class: cn('focus:outline-none', editorClassName)
//       }
//     },
//     onUpdate: ({ editor }) => handleUpdate(editor),
//     onCreate: ({ editor }) => handleCreate(editor),
//     onBlur: ({ editor }) => handleBlur(editor),
//     ...props
//   })

//   return editor
// }

// export default useMinimalTiptapEditor





// // import { useEditor } from '@tiptap/react'
// // import StarterKit from '@tiptap/starter-kit'
// // import type { Content, Editor } from '@tiptap/react'
// // // import { Underline } from 'lucide-react'
// // import Underline from '@tiptap/extension-underline'

// // export interface UseMinimalTiptapEditorProps {
// //   value?: Content
// //   editable?: boolean
// //   autofocus?: boolean
// //   onUpdate?: (content: Content) => void
// // }

// // export function useMinimalTiptapEditor(props: UseMinimalTiptapEditorProps): Editor | null {
// //   const { value, editable = true, autofocus = false, onUpdate } = props

// //   const editor = useEditor({
// //     content: value,
// //     editable,
// //     autofocus,
// //     extensions: [
// //       StarterKit, // ✅ Must be included or you'll get the "missing 'doc'" error
// //       Underline,
// //     ],
// //     onUpdate: ({ editor }) => {
// //       const json = editor.getJSON()
// //       onUpdate?.(json),
// //       editable: props.editable ?? true,
// //     },
// //   })

// //   return editor
// // }








import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { Content, UseEditorOptions } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'
import { Typography } from '@tiptap/extension-typography'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import {
  Link,
  Image,
  HorizontalRule,
  CodeBlockLowlight,
  Selection,
  Color,
  UnsetAllMarks,
  ResetMarksOnEnter,
  FileHandler
} from '../Components/texteditor/extensions'
import { cn } from '@/lib/utils'
import { fileToBase64, getOutput, randomId } from '../Components/texteditor/utils'
import { useThrottle } from '../hooks/use-throttle'
import { toast } from 'sonner'

export interface UseMinimalTiptapEditorProps extends UseEditorOptions {
  value?: Content
  output?: 'html' | 'json' | 'text'
  placeholder: string
  editorClassName?: string
  throttleDelay?: number
  onUpdate?: (content: Content) => void
  onBlur?: (content: Content) => void
}

const createExtensions = (placeholderText: string) => [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    paragraph: { HTMLAttributes: { class: 'text-node' } },
    heading: { HTMLAttributes: { class: 'heading-node' } },
    blockquote: { HTMLAttributes: { class: 'block-node' } },
    bulletList: { HTMLAttributes: { class: 'list-node' } },
    orderedList: { HTMLAttributes: { class: 'list-node' } },
    code: { HTMLAttributes: { class: 'inline', spellcheck: 'false' } },
    dropcursor: { width: 2, class: 'ProseMirror-dropcursor border' }
  }),
  Link,
  Underline,
  Image.configure({
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024,
    allowBase64: true,
    uploadFn: async file => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const src = await fileToBase64(file)
      return { id: randomId(), src }
    },
    onToggle(editor, files, pos) {
      editor.commands.insertContentAt(
        pos,
        files.map(image => {
          const blobUrl = URL.createObjectURL(image)
          const id = randomId()
          return {
            type: 'image',
            attrs: {
              id,
              src: blobUrl,
              alt: image.name,
              title: image.name,
              fileName: image.name
            }
          }
        })
      )
    },
    onImageRemoved({ id, src }) {
      console.log('Image removed', { id, src })
    },
    onValidationError(errors) {
      errors.forEach(error => {
        toast.error('Image validation error', {
          position: 'bottom-right',
          description: error.reason
        })
      })
    },
    onActionSuccess({ action }) {
      const mapping = {
        copyImage: 'Copy Image',
        copyLink: 'Copy Link',
        download: 'Download'
      }
      toast.success(mapping[action], {
        position: 'bottom-right',
        description: 'Image action success'
      })
    },
    onActionError(error, { action }) {
      const mapping = {
        copyImage: 'Copy Image',
        copyLink: 'Copy Link',
        download: 'Download'
      }
      toast.error(`Failed to ${mapping[action]}`, {
        position: 'bottom-right',
        description: error.message
      })
    }
  }),
  FileHandler.configure({
    allowBase64: true,
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024,
    onDrop: (editor, files, pos) => {
      files.forEach(async file => {
        const src = await fileToBase64(file)
        editor.commands.insertContentAt(pos, {
          type: 'image',
          attrs: { src }
        })
      })
    },
    onPaste: (editor, files) => {
      files.forEach(async file => {
        const src = await fileToBase64(file)
        editor.commands.insertContent({
          type: 'image',
          attrs: { src }
        })
      })
    },
    onValidationError: errors => {
      errors.forEach(error => {
        toast.error('Image validation error', {
          position: 'bottom-right',
          description: error.reason
        })
      })
    }
  }),
  Color,
  TextStyle,
  Selection,
  Typography,
  UnsetAllMarks,
  HorizontalRule,
  ResetMarksOnEnter,
  CodeBlockLowlight,
  Placeholder.configure({
    placeholder: placeholderText ,
    includeChildren: true,
    emptyEditorClass: 'is-editor-empty'
  })
]

export const useMinimalTiptapEditor = ({
  value,
  output = 'json',
  placeholder = '',
  editorClassName,
  throttleDelay = 0,
  onUpdate,
  onBlur,
  ...props
}: UseMinimalTiptapEditorProps) => {
  const throttledSetValue = useThrottle((value: Content) => onUpdate?.(value), throttleDelay)

  const handleUpdate = React.useCallback(
    (editor: Editor) => throttledSetValue(getOutput(editor, output)),
    [output, throttledSetValue]
  )

  const handleCreate = React.useCallback(
    (editor: Editor) => {
      if (value && editor.isEmpty) {
        editor.commands.setContent(value)
      }
    },
    [value]
  )

  const handleBlur = React.useCallback(
    (editor: Editor) => onBlur?.(getOutput(editor, output)),
    [output, onBlur]
  )

  const editor = useEditor({
    extensions: createExtensions(placeholder),
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: cn('focus:outline-none', editorClassName)
      }
    },
    onUpdate: ({ editor }) => handleUpdate(editor),
    onCreate: ({ editor }) => handleCreate(editor),
    onBlur: ({ editor }) => handleBlur(editor),
    ...props
  })

  return editor
}

export default useMinimalTiptapEditor
