import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllGuides, getGuideBySlug } from '@/lib/content'
import { MdxContent } from '@/components/MdxContent'

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { meta } = getGuideBySlug(slug)
  return {
    title: meta.title,
    description: meta.description,
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { meta, content } = getGuideBySlug(slug)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 font-mono">
        <Link href="/guides" className="hover:text-foreground transition-colors">
          Guías
        </Link>
        <span>&gt;</span>
        <span className="text-foreground">{meta.title}</span>
      </nav>

      {/* Article header */}
      <header className="mb-10 max-w-2xl">
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {meta.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-mono text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 bg-green-500/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {meta.date && (
          <p className="text-sm text-muted-foreground font-mono mb-3">
            {formatDate(meta.date)}
          </p>
        )}
        <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">{meta.title}</h1>
        {meta.description && (
          <p className="text-xl text-muted-foreground leading-relaxed">{meta.description}</p>
        )}
      </header>

      {/* Article body */}
      <div className="max-w-2xl">
        <MdxContent source={content} />
      </div>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-border max-w-2xl">
        <Link href="/guides" className="text-green-500 hover:underline text-sm font-mono">
          &lt;- Todas las Guías
        </Link>
      </div>
    </div>
  )
}
