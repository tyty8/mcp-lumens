import type { Metadata } from 'next'
import { getAllGuides } from '@/lib/content'
import { GuideCard } from '@/components/GuideCard'

export const metadata: Metadata = {
  title: 'Guías MCP',
  description:
    'Aprende a usar, configurar y construir servidores MCP con guías paso a paso.',
}

export default function GuidesPage() {
  const guides = getAllGuides()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-3">Guías</h1>
        <p className="text-lg text-muted-foreground">
          Aprende a usar, configurar y construir servidores MCP.
        </p>
      </div>
      {guides.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-mono text-sm">
          Sin guías todavía. Añade archivos MDX a{' '}
          <code className="text-green-500">content/guides/</code> para comenzar.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map(guide => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
    </div>
  )
}
