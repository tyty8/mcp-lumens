import type { Metadata } from 'next'
import { getAllServers } from '@/lib/content'
import { ServersGrid } from '@/components/ServersGrid'

export const metadata: Metadata = {
  title: 'MCP Servers',
  description:
    'Browse and discover Model Context Protocol servers. Connect your AI clients to filesystems, databases, APIs, and more.',
}

export default function ServersPage() {
  const servers = getAllServers()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-3">MCP Servers</h1>
        <p className="text-lg text-muted-foreground">
          Discover and install Model Context Protocol servers for your AI clients.
        </p>
      </div>
      <ServersGrid servers={servers} />
    </div>
  )
}
