"use client";
import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { FormatAction } from '../type'
import type { toggleVariants } from '@/components/ui/toggle'
import type { VariantProps } from 'class-variance-authority'
import { CaretDownIcon, CodeIcon, DividerHorizontalIcon, PlusIcon, QuoteIcon } from '@radix-ui/react-icons'
import { LinkEditPopover } from '../link/link-edit-popover'
import { ToolbarSection } from '../toolbar-section'
import HiddenImageUpload, { HiddenImageUploadHandle } from '../image/image-edit-block';
import ToolbarButton from '../toolbar-button';
import { ImageIcon } from '@radix-ui/react-icons'
import { useRef } from 'react'


type InsertElementAction = 'codeBlock' | 'blockquote' | 'horizontalRule'
interface InsertElement extends FormatAction {
  value: InsertElementAction
}

const formatActions: InsertElement[] = [
  {
    value: 'codeBlock',
    label: 'Code block',
    icon: <CodeIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleCodeBlock().run(),
    isActive: editor => editor.isActive('codeBlock'),
    canExecute: editor => editor.can().chain().focus().toggleCodeBlock().run(),
    shortcuts: ['mod', 'alt', 'C']
  },
  {
    value: 'blockquote',
    label: 'Blockquote',
    icon: <QuoteIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleBlockquote().run(),
    isActive: editor => editor.isActive('blockquote'),
    canExecute: editor => editor.can().chain().focus().toggleBlockquote().run(),
    shortcuts: ['mod', 'shift', 'B']
  },
  {
    value: 'horizontalRule',
    label: 'Divider',
    icon: <DividerHorizontalIcon className="size-5" />,
    action: editor => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ['mod', 'alt', '-']
  }
]

interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: InsertElementAction[]
  mainActionCount?: number
}

export const SectionFive: React.FC<SectionFiveProps> = ({
  editor,
  activeActions = formatActions.map(action => action.value),
  mainActionCount = 0,
  size,
  variant
}) => {
  const uploadRef = useRef<HiddenImageUploadHandle>(null)
  return (
    <div className='bg-white flex'>
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      <ToolbarButton
        isActive={editor.isActive('image')}
        tooltip="Image"
        aria-label="Image"
        size={size}
        variant={variant}
        onClick={() => uploadRef.current?.openPicker()}
      >
        <ImageIcon className="size-5" />
      </ToolbarButton>

      <HiddenImageUpload ref={uploadRef} editor={editor} />
      <ToolbarSection
        editor={editor}
        actions={formatActions}
        activeActions={activeActions}
        mainActionCount={mainActionCount}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </>
        }
        dropdownTooltip="Insert elements"
        size={size}
        variant={variant}
      />
    </div>
  )
}

SectionFive.displayName = 'SectionFive'

export default SectionFive
