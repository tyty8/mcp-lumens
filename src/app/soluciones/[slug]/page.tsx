import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllSolutions, getSolutionBySlug } from '@/lib/solutions'
import { SolutionDiagram } from '@/components/SolutionDiagram'

export function generateStaticParams() {
  return getAllSolutions().map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = getSolutionBySlug(slug)
  return {
    title: s.title,
    description: s.subtitle,
  }
}

export default async function SolucionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  const totalServers = solution.groups.reduce((n, g) => n + g.servers.length, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10 font-mono">
        <Link href="/soluciones" className="hover:text-foreground transition-colors">
          Soluciones
        </Link>
        <span>&gt;</span>
        <span className="text-foreground">{solution.title}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl" role="img" aria-label={solution.title}>
            {solution.emoji}
          </span>
          <div>
            <h1 className="text-4xl font-bold text-foreground leading-tight">{solution.title}</h1>
            <p className="text-lg text-muted-foreground mt-1">{solution.subtitle}</p>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-6">
          {solution.description}
        </p>

        {/* Stats badges */}
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary">
            <span className="font-bold text-sm">{totalServers}</span> servidores MCP
          </span>
          <span className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground">
            <span className="font-bold text-sm text-foreground">{solution.groups.length}</span> áreas funcionales
          </span>
          {solution.groups.map(g => (
            <span
              key={g.id}
              className="font-mono text-xs px-3 py-1.5 rounded-full border"
              style={{
                borderColor: g.hex + '40',
                backgroundColor: g.hex + '10',
                color: g.hex,
              }}
            >
              {g.emoji} {g.shortName}
            </span>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-bold text-foreground">Arquitectura de Integración</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-sm text-muted-foreground mb-6 font-mono">
          Cada área funcional se conecta al asistente de IA a través de sus servidores MCP
        </p>
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <SolutionDiagram groups={solution.groups} title={solution.title} />
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {solution.groups.map(g => (
            <div key={g.id} className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <span
                className="inline-block w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: g.hex }}
              />
              {g.name}
            </div>
          ))}
        </div>
      </section>

      {/* Detailed group cards */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-foreground">Detalle por Área</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solution.groups.map(group => (
            <div
              key={group.id}
              className="flex flex-col rounded-xl border bg-card overflow-hidden"
              style={{ borderColor: group.hex + '30' }}
            >
              {/* Group header */}
              <div
                className="px-5 py-4 border-b flex items-center gap-3"
                style={{
                  borderColor: group.hex + '30',
                  backgroundColor: group.hex + '08',
                }}
              >
                <span className="text-2xl" role="img" aria-label={group.name}>
                  {group.emoji}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{group.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* Server list */}
              <ul className="flex flex-col divide-y divide-border/50 flex-1">
                {group.servers.map(server => (
                  <li key={server.slug}>
                    <Link
                      href={`/servers/${server.slug}`}
                      className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors group"
                    >
                      <span className="font-mono text-xs truncate pr-2">{server.name}</span>
                      <span
                        className="shrink-0 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: group.hex }}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Footer count */}
              <div
                className="px-5 py-2.5 border-t text-right"
                style={{ borderColor: group.hex + '30' }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: group.hex }}
                >
                  {group.servers.length} servidores MCP
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="mt-14 pt-8 border-t border-border">
        <Link href="/soluciones" className="text-primary hover:underline text-sm font-mono">
          &lt;- Todas las Soluciones
        </Link>
      </div>
    </div>
  )
}
