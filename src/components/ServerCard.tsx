import Link from 'next/link'
import type { ServerMeta } from '@/lib/content'
import { CopyButton } from '@/components/CopyButton'

interface ServerCardProps {
  server: ServerMeta
}

const CATEGORY_STYLES: Record<ServerMeta['category'], string> = {
  'developer-tools': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'databases': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'productivity': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'security': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'ai': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'communication': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'marketing': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'finance': 'bg-green-500/10 text-green-400 border-green-500/20',
  'legal': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'hr': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'logistics': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'real-estate': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'healthcare': 'bg-red-500/10 text-red-400 border-red-500/20',
  'education': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'retail': 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  'travel': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

const CATEGORY_LABELS: Record<ServerMeta['category'], string> = {
  'developer-tools': 'Desarrollo',
  'databases': 'Bases de datos',
  'productivity': 'Productividad',
  'security': 'Seguridad',
  'ai': 'IA',
  'communication': 'Comunicación',
  'marketing': 'Marketing',
  'finance': 'Finanzas',
  'legal': 'Legal',
  'hr': 'RRHH',
  'logistics': 'Logística',
  'real-estate': 'Inmobiliaria',
  'healthcare': 'Salud',
  'education': 'Educación',
  'retail': 'Comercio',
  'travel': 'Viajes',
}

export function ServerCard({ server }: ServerCardProps) {
  const categoryStyle = CATEGORY_STYLES[server.category] ?? 'bg-muted text-muted-foreground border-border'
  const categoryLabel = CATEGORY_LABELS[server.category] ?? server.category

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-5 hover:border-border/60 hover:border-primary/30 transition-colors group">
      {/* Top row: name + badges */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link
          href={`/servers/${server.slug}`}
          className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug"
        >
          {server.name}
        </Link>
        <div className="flex gap-1.5 shrink-0 mt-0.5">
          {server.official && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono">
              oficial
            </span>
          )}
          {server.featured && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
              &#9733;
            </span>
          )}
        </div>
      </div>

      {/* Category badge */}
      <div className="mb-3">
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full border font-mono ${categoryStyle}`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
        {server.description}
      </p>

      {/* Tags */}
      {server.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {server.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Install snippet */}
      {server.install && (
        <div className="install-snippet mt-auto mb-3 justify-between">
          <span className="truncate">{server.install}</span>
          <CopyButton text={server.install} />
        </div>
      )}

      {/* GitHub link */}
      {server.github && (
        <a
          href={server.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-xs font-mono text-muted-foreground hover:text-primary transition-colors self-start"
        >
          GitHub &rarr;
        </a>
      )}
    </div>
  )
}
