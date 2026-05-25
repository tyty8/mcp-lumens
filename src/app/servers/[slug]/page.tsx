import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllServers, getServerBySlug } from '@/lib/content'
import { MdxContent } from '@/components/MdxContent'

export async function generateStaticParams() {
  const servers = getAllServers()
  return servers.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { meta } = getServerBySlug(slug)
  return {
    title: meta.name,
    description: meta.description,
  }
}

export default async function ServerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { meta, content } = getServerBySlug(slug)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 font-mono">
        <Link href="/servers" className="hover:text-foreground transition-colors">
          Servidores
        </Link>
        <span>&gt;</span>
        <span className="text-foreground">{meta.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-4xl font-bold text-foreground">{meta.name}</h1>
          {meta.official && (
            <span className="text-sm px-2 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20 font-mono">
              oficial
            </span>
          )}
          <span className="text-sm px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">
            {meta.category}
          </span>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {meta.description}
        </p>
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          {content.trim() ? (
            <MdxContent source={content} />
          ) : (
            <p className="text-muted-foreground font-mono text-sm">Sin documentación adicional.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Install command */}
          {meta.install && (
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider font-mono">
                Instalar
              </h2>
              <pre className="bg-card border border-border rounded-md p-3 overflow-x-auto font-mono text-sm text-green-400 select-all">
                <code>{meta.install}</code>
              </pre>
            </div>
          )}

          {/* Tags */}
          {meta.tags.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider font-mono">
                Etiquetas
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* GitHub link */}
          {meta.github && (
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider font-mono">
                Repositorio
              </h2>
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-500 hover:underline font-mono break-all"
              >
                {meta.github.replace('https://github.com/', 'github.com/')}
              </a>
            </div>
          )}

          {/* Category */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider font-mono">
              Categoría
            </h2>
            <Link
              href={`/servers?category=${meta.category}`}
              className="text-sm font-mono text-muted-foreground hover:text-green-500 transition-colors"
            >
              {meta.category}
            </Link>
          </div>
        </aside>
      </div>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link href="/servers" className="text-primary hover:underline text-sm font-mono text-green-500">
          &lt;- Todos los Servidores
        </Link>
      </div>
    </div>
  )
}
