import type { Metadata } from 'next'
import { getAllServers } from '@/lib/content'
import { ServersGrid } from '@/components/ServersGrid'

export const metadata: Metadata = {
  title: 'Servidores MCP',
  description:
    'Explora y descubre servidores MCP. Conecta tus clientes de IA a sistemas de archivos, bases de datos, APIs y mucho más.',
}

export default function ServersPage() {
  const servers = getAllServers()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-3">Servidores MCP</h1>
        <p className="text-lg text-muted-foreground">
          Descubre e instala servidores MCP para tus clientes de IA.
        </p>
      </div>
      <ServersGrid servers={servers} />
    </div>
  )
}
