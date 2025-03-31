

'use client'

import * as React from 'react'
import type { Editor } from '@tiptap/react'
import { usePostImageMutation } from '@/app/redux/service/user'
import { toast } from 'sonner'

export interface HiddenImageUploadHandle {
  openPicker: () => void
}

interface Props {
  editor: Editor
}

const HiddenImageUpload = React.forwardRef<HiddenImageUploadHandle, Props>(
  ({ editor }, ref) => {
    const fileRef = React.useRef<HTMLInputElement>(null)
    const [uploadImage] = usePostImageMutation()

    React.useImperativeHandle(ref, () => ({
      openPicker: () => {
        fileRef.current?.click()
      },
    }))

    const insertImage = (src: string, alt = 'Image') => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: { src, alt },
        })
        .run()
    }

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      console.log("file:", file)
      if (!file) return

      try {
        const response = await uploadImage({ image: file }).unwrap()
        const filePath = response?.data?.file_path

        if (filePath) {
          const API = (process.env.NEXT_PUBLIC_O2_API_URL || '').replace(/\/+$/, '')
          const path = filePath.replace(/^\/+/, '')
          const fullUrl = `${API}/${path}`
          insertImage(fullUrl, file.name)
          toast.success('Image uploaded')
        } else {
          toast.error('No file_path in response')
        }
      } catch (err) {
        toast.error('Upload failed')
        console.error(err)
      } finally {
        // Reset input for same file re-selection
        if (fileRef.current) fileRef.current.value = ''
      }
    }

    return (
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
    )
  }
)

HiddenImageUpload.displayName = 'HiddenImageUpload'
export default HiddenImageUpload
