'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { ServerMeta } from '@/lib/content'
import { CopyButton } from '@/components/CopyButton'

type ColKey = 'category' | 'official' | 'description' | 'tags' | 'install' | 'github'

const COLS: { key: ColKey; label: string; defaultOn: boolean }[] = [
  { key: 'category',    label: 'Categoría',   defaultOn: true  },
  { key: 'official',    label: 'Oficial',      defaultOn: true  },
  { key: 'description', label: 'Descripción',  defaultOn: true  },
  { key: 'tags',        label: 'Etiquetas',    defaultOn: true  },
  { key: 'install',     label: 'Instalar',     defaultOn: false },
  { key: 'github',      label: 'GitHub',       defaultOn: true  },
]

const CAT_LABEL: Record<string, string> = {
  'developer-tools': 'Desarrollo',
  databases:         'Bases de datos',
  productivity:      'Productividad',
  security:          'Seguridad',
  ai:                'IA',
  communication:     'Comunicación',
  marketing:         'Marketing',
  finance:           'Finanzas',
  legal:             'Legal',
  hr:                'RRHH',
  logistics:         'Logística',
  'real-estate':     'Inmobiliaria',
  healthcare:        'Salud',
  education:         'Educación',
  retail:            'Comercio',
  travel:            'Viajes',
}

const CAT_COLOR: Record<string, string> = {
  'developer-tools': '#10b981',
  databases:         '#3b82f6',
  productivity:      '#a855f7',
  security:          '#f59e0b',
  ai:                '#8b5cf6',
  communication:     '#0ea5e9',
  marketing:         '#ec4899',
  finance:           '#22c55e',
  legal:             '#94a3b8',
  hr:                '#f97316',
  logistics:         '#eab308',
  'real-estate':     '#14b8a6',
  healthcare:        '#ef4444',
  education:         '#6366f1',
  retail:            '#d946ef',
  travel:            '#06b6d4',
}

const ALL_CATEGORIES = [
  { value: 'All', label: 'Todas las categorías' },
  ...Object.entries(CAT_LABEL)
    .sort((a, b) => a[1].localeCompare(b[1], 'es'))
    .map(([value, label]) => ({ value, label })),
]

interface Props {
  servers: ServerMeta[]
}

export function ServersTable({ servers }: Props) {
  const [visible, setVisible] = useState<Set<ColKey>>(
    () => new Set(COLS.filter(c => c.defaultOn).map(c => c.key))
  )
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort]         = useState<{ col: string; dir: 'asc' | 'desc' }>({
    col: 'name',
    dir: 'asc',
  })
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const fuse = useMemo(
    () =>
      new Fuse(servers, {
        keys: [
          { name: 'name',        weight: 2 },
          { name: 'description', weight: 1 },
          { name: 'tags',        weight: 0.5 },
        ],
        threshold: 0.35,
      }),
    [servers]
  )

  const rows = useMemo(() => {
    let base = query.trim()
      ? fuse.search(query.trim()).map(r => r.item)
      : servers

    if (category !== 'All') base = base.filter(s => s.category === category)

    return [...base].sort((a, b) => {
      const d = sort.dir === 'asc' ? 1 : -1
      switch (sort.col) {
        case 'name':
          return a.name.localeCompare(b.name, 'es') * d
        case 'category':
          return (CAT_LABEL[a.category] ?? a.category).localeCompare(
            CAT_LABEL[b.category] ?? b.category, 'es'
          ) * d
        case 'official':
          return a.official === b.official ? 0 : (a.official ? -1 : 1) * d
        case 'install':
          return (a.install ?? '').localeCompare(b.install ?? '', 'es') * d
        default:
          return 0
      }
    })
  }, [servers, fuse, query, category, sort])

  function toggleCol(key: ColKey) {
    setVisible(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  function handleSort(col: string) {
    setSort(prev => ({
      col,
      dir: prev.col === col && prev.dir === 'asc' ? 'desc' : 'asc',
    }))
  }

  const allExpanded = rows.length > 0 && rows.every(s => expandedRows.has(s.slug))

  function toggleAll() {
    setExpandedRows(allExpanded ? new Set() : new Set(rows.map(s => s.slug)))
  }

  function toggleRow(slug: string) {
    setExpandedRows(prev => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
  }

  function SortIcon({ col }: { col: string }) {
    if (sort.col !== col) return <span className="opacity-25 ml-1">↕</span>
    return (
      <span className="ml-1 text-primary">
        {sort.dir === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  function ChevronIcon({ expanded }: { expanded: boolean }) {
    return (
      <svg
        className={`w-3 h-3 transition-transform duration-150 ${expanded ? 'rotate-90' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
      </svg>
    )
  }

  const colSpan = 1 + visible.size

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-5 space-y-3">
        {/* Search + category */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
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
              onChange={e => setQuery(e.target.value)}
              className="w-full rounded-md border border-border bg-card pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
          >
            {ALL_CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Column toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground shrink-0 mr-1">
            Columnas:
          </span>
          {COLS.map(col => (
            <button
              key={col.key}
              onClick={() => toggleCol(col.key)}
              className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
                visible.has(col.key)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {visible.has(col.key) ? '✓ ' : ''}
              {col.label}
            </button>
          ))}
          <button
            onClick={() => setVisible(new Set(COLS.map(c => c.key)))}
            className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors ml-1"
          >
            Mostrar todo
          </button>
        </div>

        {/* Count + expand-all */}
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            {rows.length}{' '}
            {rows.length === 1 ? 'servidor' : 'servidores'}
            {category !== 'All' || query ? ' encontrados' : ''}
          </p>
          {rows.length > 0 && (
            <button
              onClick={toggleAll}
              className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
            >
              {allExpanded ? '↑ Colapsar todo' : '↓ Expandir todo'}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          {/* ── Head ── */}
          <thead>
            <tr className="border-b border-border bg-card">
              {/* Name — sticky top + left corner */}
              <th className="sticky top-14 left-0 z-30 bg-card px-4 py-3 text-left min-w-[200px] border-r border-border/50">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground"
                >
                  Nombre <SortIcon col="name" />
                </button>
              </th>

              {visible.has('category') && (
                <th className="sticky top-14 z-20 bg-card px-4 py-3 text-left min-w-[130px]">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground"
                  >
                    Categoría <SortIcon col="category" />
                  </button>
                </th>
              )}

              {visible.has('official') && (
                <th className="sticky top-14 z-20 bg-card px-4 py-3 text-left min-w-[88px]">
                  <button
                    onClick={() => handleSort('official')}
                    className="flex items-center font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground"
                  >
                    Oficial <SortIcon col="official" />
                  </button>
                </th>
              )}

              {visible.has('description') && (
                <th className="sticky top-14 z-20 bg-card px-4 py-3 text-left min-w-[300px]">
                  <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Descripción
                  </span>
                </th>
              )}

              {visible.has('tags') && (
                <th className="sticky top-14 z-20 bg-card px-4 py-3 text-left min-w-[200px]">
                  <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Etiquetas
                  </span>
                </th>
              )}

              {visible.has('install') && (
                <th className="sticky top-14 z-20 bg-card px-4 py-3 text-left min-w-[280px]">
                  <button
                    onClick={() => handleSort('install')}
                    className="flex items-center font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground"
                  >
                    Instalar <SortIcon col="install" />
                  </button>
                </th>
              )}

              {visible.has('github') && (
                <th className="sticky top-14 z-20 bg-card px-4 py-3 text-left min-w-[220px]">
                  <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    GitHub / Repositorio
                  </span>
                </th>
              )}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {rows.map(server => {
              const isExpanded = expandedRows.has(server.slug)
              return (
              <tr key={server.slug} className="group border-b border-border/40 last:border-0">
                {/* Name — sticky left */}
                <td className="sticky left-0 z-10 bg-card group-hover:bg-muted/50 transition-colors px-4 py-3 align-top border-r border-border/30">
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => toggleRow(server.slug)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? 'Colapsar fila' : 'Expandir fila'}
                      className="mt-1 shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronIcon expanded={isExpanded} />
                    </button>
                    <div>
                      <Link
                        href={`/servers/${server.slug}`}
                        className="font-medium text-foreground hover:text-primary transition-colors leading-snug block"
                      >
                        {server.name}
                      </Link>
                      {server.featured && (
                        <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">★ destacado</span>
                      )}
                    </div>
                  </div>
                </td>

                {visible.has('category') && (
                  <td className="group-hover:bg-muted/50 transition-colors px-4 py-3 align-top">
                    <span
                      className="text-xs font-mono font-medium"
                      style={{ color: CAT_COLOR[server.category] ?? '#6b7280' }}
                    >
                      {CAT_LABEL[server.category] ?? server.category}
                    </span>
                  </td>
                )}

                {visible.has('official') && (
                  <td className="group-hover:bg-muted/50 transition-colors px-4 py-3 align-top">
                    {server.official ? (
                      <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-1.5 py-0.5 rounded">
                        oficial
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/30 font-mono">—</span>
                    )}
                  </td>
                )}

                {visible.has('description') && (
                  <td className="group-hover:bg-muted/50 transition-colors px-4 py-3 align-top">
                    <p
                      className={`text-xs text-muted-foreground leading-relaxed ${isExpanded ? '' : 'line-clamp-2 max-w-sm'}`}
                    >
                      {server.description}
                    </p>
                  </td>
                )}

                {visible.has('tags') && (
                  <td className="group-hover:bg-muted/50 transition-colors px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-1">
                      {(isExpanded ? server.tags : server.tags.slice(0, 4)).map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {!isExpanded && server.tags.length > 4 && (
                        <span className="text-[10px] font-mono text-muted-foreground/50">
                          +{server.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </td>
                )}

                {visible.has('install') && (
                  <td className="group-hover:bg-muted/50 transition-colors px-4 py-3 align-top">
                    {server.install ? (
                      <div className="flex items-center gap-2">
                        <code
                          className="text-xs font-mono text-green-400 truncate max-w-[180px] block"
                          title={server.install}
                        >
                          {server.install}
                        </code>
                        <CopyButton text={server.install} />
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground/30 font-mono">—</span>
                    )}
                  </td>
                )}

                {visible.has('github') && (
                  <td className="group-hover:bg-muted/50 transition-colors px-4 py-3 align-top">
                    {server.github ? (
                      <a
                        href={server.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-primary hover:underline truncate block max-w-[200px]"
                        title={server.github}
                      >
                        {server.github.replace('https://github.com/', 'github.com/')}
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground/30 font-mono">—</span>
                    )}
                  </td>
                )}
              </tr>
            )})}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={colSpan}
                  className="px-4 py-20 text-center text-sm text-muted-foreground font-mono"
                >
                  No se encontraron servidores
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
