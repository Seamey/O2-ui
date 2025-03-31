// 'use client'

// import * as React from 'react'
// import './styles/index.css'

// import type { Content, Editor } from '@tiptap/react'
// import type { UseMinimalTiptapEditorProps } from '../../hooks/use-minimal-tiptap'
// import { EditorContent } from '@tiptap/react'
// import { Separator } from '@/components/ui/separator'
// import { cn } from '@/lib/utils'
// import { SectionOne } from './section/one'
// import { SectionTwo } from './section/two'
// import { SectionFour } from './section/four'
// import { SectionFive } from './section/five'
// import { LinkBubbleMenu } from './bubble-menu/link-bubble-menu'
// import { useMinimalTiptapEditor } from '../../hooks/use-minimal-tiptap'
// import { MeasuredContainer } from './measured-container'

// export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
//   value?: Content
//   onChange?: (value: Content) => void
//   className?: string
//   editorContentClassName?: string
//   placeholder?: string 
// }

// const Toolbar = ({ editor }: { editor: Editor }) => (
//   <div className="shrink-0 overflow-x-auto border-b rounded-xl-t p-2 text-lg mb-2">
//     <div className="flex w-max items-center gap-px">
//       <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />
//       {/* <Separator orientation="vertical" className="mx-2 h-7" /> */}
//       <SectionTwo editor={editor} activeActions={["bold", "italic", "underline", "strikethrough", "code", "clearFormatting"]} mainActionCount={3} />
//       {/* <Separator orientation="vertical" className="mx-2 h-7" /> */}
//       <SectionFour editor={editor} activeActions={["orderedList", "bulletList"]} mainActionCount={0} />
//       {/* <Separator orientation="vertical" className="mx-2 h-7" /> */}
//       <SectionFive editor={editor} activeActions={["codeBlock", "blockquote", "horizontalRule"]} mainActionCount={0} />
      
//     </div>
//   </div>
// )

// export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
//   ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
//     const editor = useMinimalTiptapEditor({
//       value: value ?? {
//         type: 'doc',
//         content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
//       },
//       onUpdate: onChange,
//       output:"json",
//       editable: true,
//       placeholder,
//       ...props,
//     })

//     if (!editor) {
//       return null
//     }

//     return (
//       <MeasuredContainer
//         as="div"
//         name="editor"
//         ref={ref}
//         className={cn(
//           'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary ',
//           className
//         )}
//       >
//         <Toolbar editor={editor} />
//         <EditorContent editor={editor} className={cn('minimal-tiptap-editor', editorContentClassName)} />
//         <LinkBubbleMenu editor={editor}  />
//       </MeasuredContainer>
//     )
//   }
// )

// MinimalTiptapEditor.displayName = 'MinimalTiptapEditor'
// export default MinimalTiptapEditor





'use client'

import * as React from 'react'
import './styles/index.css'

import type { Content, Editor } from '@tiptap/react'
import type { UseMinimalTiptapEditorProps } from '../../hooks/use-minimal-tiptap'
import { EditorContent } from '@tiptap/react'
import { cn } from '@/lib/utils'
import { SectionOne } from './section/one'
import { SectionTwo } from './section/two'
import { SectionFour } from './section/four'
import { SectionFive } from './section/five'
import { LinkBubbleMenu } from './bubble-menu/link-bubble-menu'
import { useMinimalTiptapEditor } from '../../hooks/use-minimal-tiptap'
import { MeasuredContainer } from './measured-container'

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
  placeholder: string // ✅ Add placeholder prop
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b rounded-xl-t p-2 text-lg mb-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />
      <SectionTwo
        editor={editor}
        activeActions={['bold', 'italic', 'underline', 'strikethrough', 'code', 'clearFormatting']}
        mainActionCount={3}
      />
      <SectionFour editor={editor} activeActions={['orderedList', 'bulletList']} mainActionCount={0} />
      <SectionFive editor={editor} activeActions={['codeBlock', 'blockquote', 'horizontalRule']} mainActionCount={0} />
    </div>
  </div>
)

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, placeholder, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value: value ?? {
        type: 'doc',
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
      },
      onUpdate: onChange,
      output: 'json',
      editable: true,
      placeholder , // ✅ Pass placeholder to the hook
      ...props,
    })

    if (!editor) {
      return null
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
          className
        )}
      >
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className={cn('minimal-tiptap-editor', editorContentClassName)} />
        <LinkBubbleMenu editor={editor} />
      </MeasuredContainer>
    )
  }
)

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor'
export default MinimalTiptapEditor
