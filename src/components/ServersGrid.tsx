'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { ServerMeta } from '@/lib/content'
import { ServerCard } from '@/components/ServerCard'

interface ServersGridProps {
  servers: ServerMeta[]
}

type CategoryFilter = 'All' | ServerMeta['category']

const CATEGORY_TABS: { value: CategoryFilter; label: string }[] = [
  { value: 'All', label: 'Todo' },
  { value: 'communication', label: 'Comunicación' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finanzas' },
  { value: 'legal', label: 'Legal' },
  { value: 'hr', label: 'RRHH' },
  { value: 'logistics', label: 'Logística' },
  { value: 'real-estate', label: 'Inmobiliaria' },
  { value: 'healthcare', label: 'Salud' },
  { value: 'education', label: 'Educación' },
  { value: 'retail', label: 'Comercio' },
  { value: 'travel', label: 'Viajes' },
  { value: 'developer-tools', label: 'Desarrollo' },
  { value: 'databases', label: 'Bases de datos' },
  { value: 'productivity', label: 'Productividad' },
  { value: 'security', label: 'Seguridad' },
  { value: 'ai', label: 'IA' },
]

export function ServersGrid({ servers }: ServersGridProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All')

  const fuse = useMemo(
    () =>
      new Fuse(servers, {
        keys: [
          { name: 'name', weight: 2 },
          { name: 'description', weight: 1 },
          { name: 'tags', weight: 1 },
        ],
        threshold: 0.35,
        includeScore: false,
      }),
    [servers],
  )

  const filtered = useMemo(() => {
    let results = query.trim()
      ? fuse.search(query.trim()).map((r) => r.item)
      : servers

    if (activeCategory !== 'All') {
      results = results.filter((s) => s.category === activeCategory)
    }

    return results
  }, [servers, fuse, query, activeCategory])

  return (
    <div>
      {/* Search input */}
      <div className="mb-5">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="search"
            placeholder="Buscar servidores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
          />
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {CATEGORY_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
              activeCategory === value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mb-4 text-xs text-muted-foreground font-mono">
        {filtered.length} {filtered.length === 1 ? 'servidor' : 'servidores'}
        {activeCategory !== 'All' || query ? ` encontrados` : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-mono text-muted-foreground text-sm">No se encontraron servidores</p>
          <p className="font-mono text-muted-foreground/60 text-xs mt-1">
            Prueba con otro término de búsqueda o categoría
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((server) => (
            <ServerCard key={server.slug} server={server} />
          ))}
        </div>
      )}
    </div>
  )
}
