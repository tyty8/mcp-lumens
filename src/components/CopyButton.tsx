'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      className={cn(
        'shrink-0 font-mono text-xs px-2 py-0.5 rounded border transition-colors',
        copied
          ? 'border-primary/50 text-primary bg-primary/10'
          : 'border-border text-muted-foreground hover:border-border/80 hover:text-foreground bg-transparent',
        className,
      )}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}
