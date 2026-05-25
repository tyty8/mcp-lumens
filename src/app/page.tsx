import Link from 'next/link'
import { getAllServers, getAllGuides } from '@/lib/content'
import { ServerCard } from '@/components/ServerCard'
import { GuideCard } from '@/components/GuideCard'

export default function HomePage() {
  const allServers = getAllServers()
  const featuredServers = allServers.filter(s => s.featured).slice(0, 3)
  const guides = getAllGuides().slice(0, 3)

  const totalServers = allServers.length
  const categories = Array.from(new Set(allServers.map(s => s.category))).length

  return (
    <div>
      {/* HERO */}
      <section className="py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-green-500 font-mono text-sm mb-4 tracking-widest uppercase">
              Model Context Protocol
            </p>
            <h1 className="text-5xl font-bold text-foreground leading-tight mb-6 tracking-tight">
              El Directorio de Servidores MCP
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Descubre, instala y conecta servidores MCP a cualquier cliente de IA.
              Amplía tu IA con herramientas del mundo real.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/servers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors"
              >
                Explorar Servidores
                <span aria-hidden="true">-&gt;</span>
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:border-green-500/50 hover:text-green-500 transition-colors"
              >
                Leer Guías
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex divide-x divide-border">
            <div className="py-6 pr-8">
              <span className="text-2xl font-bold font-mono text-green-500">
                {totalServers > 0 ? `${totalServers}+` : '9+'}
              </span>
              <span className="ml-2 text-muted-foreground text-sm">Servidores</span>
            </div>
            <div className="py-6 px-8">
              <span className="text-2xl font-bold font-mono text-green-500">
                {categories > 0 ? categories : 5}
              </span>
              <span className="ml-2 text-muted-foreground text-sm">Categorías</span>
            </div>
            <div className="py-6 px-8">
              <span className="text-2xl font-bold font-mono text-green-500">Abierto</span>
              <span className="ml-2 text-muted-foreground text-sm">Código</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVERS */}
      {featuredServers.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Servidores Destacados</h2>
              <Link
                href="/servers"
                className="text-sm text-green-500 hover:underline font-mono"
              >
                Ver todos los servidores -&gt;
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServers.map(server => (
                <ServerCard key={server.slug} server={server} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUÉ ES MCP */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">¿Qué es MCP?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El Model Context Protocol (MCP) es un estándar abierto que permite a los modelos de IA como
                Claude conectarse a herramientas externas y fuentes de datos. En lugar de limitarse a
                lo que aprendieron durante el entrenamiento, los clientes de IA pueden invocar servidores MCP
                para leer archivos, consultar bases de datos, navegar por la web, ejecutar código y mucho más.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Los servidores MCP exponen una interfaz coherente — herramientas, recursos y prompts —
                que cualquier cliente de IA compatible puede descubrir y usar. Configúralo una vez,
                úsalo en cualquier lugar.
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-mono mb-2">
                claude_desktop_config.json
              </p>
              <pre className="bg-card border border-border rounded-md p-4 overflow-x-auto font-mono text-sm text-foreground">
                <code>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/tu/Documentos"
      ]
    }
  }
}`}</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-3 font-mono">
                Añade esto a tu configuración de Claude Desktop para habilitar el acceso al sistema de archivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GUÍAS */}
      {guides.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Aprende y Construye</h2>
              <Link
                href="/guides"
                className="text-sm text-green-500 hover:underline font-mono"
              >
                Todas las guías -&gt;
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {featuredServers.length === 0 && guides.length === 0 && (
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-muted-foreground font-mono text-sm">
              Contenido próximamente. Añade archivos MDX a{' '}
              <code className="text-green-500">content/servers/</code> y{' '}
              <code className="text-green-500">content/guides/</code> para comenzar.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
