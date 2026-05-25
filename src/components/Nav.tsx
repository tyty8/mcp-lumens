'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/servers', label: 'Servidores' },
  { href: '/tabla', label: 'Tabla' },
  { href: '/soluciones', label: 'Soluciones' },
  { href: '/guides', label: 'Guías' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="font-mono font-bold text-base text-primary">MCP</span>
          <span className="font-mono text-base text-muted-foreground">servers</span>
        </Link>

        {/* Center/right nav */}
        <nav className="flex items-center gap-1 text-sm">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-1.5 rounded-md transition-colors font-mono text-xs',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
              >
                {label}
              </Link>
            )
          })}

          <span className="ml-3 h-4 w-px bg-border" aria-hidden="true" />

          <a
            href="https://www.lumenssur.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            &larr; lumenssur.com
          </a>
        </nav>
      </div>
    </header>
  )
}
