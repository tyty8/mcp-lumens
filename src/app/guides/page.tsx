import type { Metadata } from 'next'
import { getAllGuides } from '@/lib/content'
import { GuideCard } from '@/components/GuideCard'

export const metadata: Metadata = {
  title: 'MCP Guides',
  description:
    'Learn how to use, configure, and build Model Context Protocol servers with step-by-step guides.',
}

export default function GuidesPage() {
  const guides = getAllGuides()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-3">Guides</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use, configure, and build MCP servers.
        </p>
      </div>
      {guides.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-mono text-sm">
          No guides yet. Add MDX files to{' '}
          <code className="text-green-500">content/guides/</code> to get started.
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
