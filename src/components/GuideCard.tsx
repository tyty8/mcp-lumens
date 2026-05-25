import Link from 'next/link'
import type { GuideMeta } from '@/lib/content'

interface GuideCardProps {
  guide: GuideMeta
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="flex flex-col gap-2 rounded-lg border border-border bg-card p-5 hover:border-primary/30 transition-colors group"
    >
      {/* Date */}
      {guide.date && (
        <p className="text-xs font-mono text-muted-foreground">
          {formatDate(guide.date)}
        </p>
      )}

      {/* Title */}
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
        {guide.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
        {guide.description}
      </p>

      {/* Tags */}
      {guide.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {guide.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Read link */}
      <span className="mt-1 text-xs font-mono text-primary group-hover:underline underline-offset-4">
        Read guide &rarr;
      </span>
    </Link>
  )
}
