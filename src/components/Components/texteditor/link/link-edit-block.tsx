import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
// import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface LinkEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string
  defaultText?: string
  defaultIsNewTab?: boolean
  onSave: (url: string, text?: string, isNewTab?: boolean) => void
}

export const LinkEditBlock = React.forwardRef<HTMLDivElement, LinkEditorProps>(
  ({ onSave,  defaultUrl,  className }, ref) => {
    const formRef = React.useRef<HTMLDivElement>(null)
    const [url, setUrl] = React.useState(defaultUrl || '')
    // const [text, setText] = React.useState(defaultText || '')
    // const [isNewTab, setIsNewTab] = React.useState(defaultIsNewTab || false)

    const handleSave = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault()
        if (formRef.current) {
          const isValid = Array.from(formRef.current.querySelectorAll('input')).every(input => input.checkValidity())

          if (isValid) {
            onSave(url)
          } else {
            formRef.current.querySelectorAll('input').forEach(input => {
              if (!input.checkValidity()) {
                input.reportValidity()
              }
            })
          }
        }
      },
      [onSave, url]
    )

    React.useImperativeHandle(ref, () => formRef.current as HTMLDivElement)

    return (
      <div ref={formRef}>
        <div className={cn('space-y-4 bg-white', className)}>
          <div className="space-y-1">
            <Label>URL</Label>
            <Input type="url" required placeholder="Enter URL" value={url} onChange={e => setUrl(e.target.value)} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

LinkEditBlock.displayName = 'LinkEditBlock'

export default LinkEditBlock
