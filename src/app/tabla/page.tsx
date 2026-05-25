import type { Metadata } from 'next'
import { getAllServers } from '@/lib/content'
import { ServersTable } from '@/components/ServersTable'

export const metadata: Metadata = {
  title: 'Directorio Completo de Servidores MCP',
  description:
    'Todos los servidores MCP en una tabla interactiva. Filtra por categoría, busca por nombre y personaliza las columnas visibles.',
}

export default function TablaPage() {
  const servers = getAllServers()

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono text-primary mb-3 uppercase tracking-widest">
          {servers.length} servidores indexados
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-3">Directorio Completo</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Todos los servidores MCP en una sola tabla. Busca, filtra por categoría y
          muestra u oculta las columnas que necesitas.
        </p>
      </div>
      <ServersTable servers={servers} />
    </div>
  )
}
