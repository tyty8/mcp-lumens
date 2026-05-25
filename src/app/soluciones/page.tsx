import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllSolutions } from '@/lib/solutions'

export const metadata: Metadata = {
  title: 'Soluciones por Sector',
  description:
    'Descubre qué servidores MCP encajan con tu negocio: despacho legal, fabricación, comercio minorista y empresas de servicios B2B.',
}

const ACCENT: Record<string, string> = {
  'despacho-legal':     'from-blue-500/10 via-indigo-500/5 to-transparent border-blue-500/20',
  'fabricacion-mediana':'from-purple-500/10 via-yellow-500/5 to-transparent border-purple-500/20',
  'retailer':           'from-pink-500/10 via-fuchsia-500/5 to-transparent border-pink-500/20',
  'empresa-servicios':  'from-red-500/10 via-teal-500/5 to-transparent border-red-500/20',
}

const EMOJI_BG: Record<string, string> = {
  'despacho-legal':     'bg-blue-500/10',
  'fabricacion-mediana':'bg-purple-500/10',
  'retailer':           'bg-pink-500/10',
  'empresa-servicios':  'bg-red-500/10',
}

export default function SolucionesPage() {
  const solutions = getAllSolutions()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <p className="text-xs font-mono text-primary mb-3 uppercase tracking-widest">Casos de uso</p>
        <h1 className="text-4xl font-bold text-foreground mb-4">Soluciones por Sector</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Stacks de servidores MCP seleccionados para tipos de negocio concretos. Cada solución
          muestra qué herramientas encajan, cómo se conectan y por qué.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {solutions.map(solution => {
          const totalServers = solution.groups.reduce((n, g) => n + g.servers.length, 0)
          const accent = ACCENT[solution.slug] ?? 'from-muted/20 to-transparent border-border'
          const emojiBg = EMOJI_BG[solution.slug] ?? 'bg-muted'

          return (
            <Link
              key={solution.slug}
              href={`/soluciones/${solution.slug}`}
              className={`group relative flex flex-col rounded-xl border bg-gradient-to-br ${accent} p-6 hover:border-opacity-60 transition-all duration-200 hover:scale-[1.01]`}
            >
              {/* Emoji */}
              <div className={`w-14 h-14 rounded-xl ${emojiBg} flex items-center justify-center text-3xl mb-5`}>
                {solution.emoji}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-foreground mb-1">{solution.title}</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {solution.subtitle}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4 mb-5 font-mono text-xs text-muted-foreground">
                <span className="text-foreground font-semibold">{totalServers}</span> servidores
                <span className="text-foreground font-semibold">{solution.groups.length}</span> áreas funcionales
              </div>

              {/* Group chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {solution.groups.map(g => (
                  <span
                    key={g.id}
                    className="text-xs font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                    style={{ borderColor: g.hex + '40', color: g.hex }}
                  >
                    {g.emoji} {g.shortName}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center gap-1 text-sm font-mono text-primary group-hover:gap-2 transition-all">
                Ver solución completa
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
