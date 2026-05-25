import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface ServerMeta {
  name: string
  slug: string
  description: string
  category: 'developer-tools' | 'databases' | 'productivity' | 'security' | 'ai'
  tags: string[]
  official: boolean
  install?: string
  github?: string
  featured?: boolean
}

export interface GuideMeta {
  title: string
  slug: string
  description: string
  date: string
  tags: string[]
}

const VALID_CATEGORIES = new Set([
  'developer-tools',
  'databases',
  'productivity',
  'security',
  'ai',
])

function normalizeCategory(
  raw: unknown,
): ServerMeta['category'] {
  if (typeof raw === 'string' && VALID_CATEGORIES.has(raw)) {
    return raw as ServerMeta['category']
  }
  return 'developer-tools'
}

export function getAllServers(): ServerMeta[] {
  const serversDir = path.join(CONTENT_DIR, 'servers')
  if (!fs.existsSync(serversDir)) return []

  const files = fs
    .readdirSync(serversDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  const servers = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, '')
    const raw = fs.readFileSync(path.join(serversDir, file), 'utf8')
    const { data } = matter(raw)

    return {
      name: data.name ?? slug,
      slug,
      description: data.description ?? '',
      category: normalizeCategory(data.category),
      tags: data.tags ?? [],
      official: data.official ?? false,
      install: data.install,
      github: data.github,
      featured: data.featured ?? false,
    } satisfies ServerMeta
  })

  return servers.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.name.localeCompare(b.name)
  })
}

export function getServerBySlug(slug: string): { meta: ServerMeta; content: string } {
  const serversDir = path.join(CONTENT_DIR, 'servers')
  const extensions = ['.mdx', '.md']
  let raw = ''

  for (const ext of extensions) {
    const filePath = path.join(serversDir, `${slug}${ext}`)
    if (fs.existsSync(filePath)) {
      raw = fs.readFileSync(filePath, 'utf8')
      break
    }
  }

  if (!raw) throw new Error(`Server not found: ${slug}`)

  const { data, content } = matter(raw)

  const meta: ServerMeta = {
    name: data.name ?? slug,
    slug,
    description: data.description ?? '',
    category: normalizeCategory(data.category),
    tags: data.tags ?? [],
    official: data.official ?? false,
    install: data.install,
    github: data.github,
    featured: data.featured ?? false,
  }

  return { meta, content }
}

export function getAllGuides(): GuideMeta[] {
  const guidesDir = path.join(CONTENT_DIR, 'guides')
  if (!fs.existsSync(guidesDir)) return []

  const files = fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  const guides = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, '')
    const raw = fs.readFileSync(path.join(guidesDir, file), 'utf8')
    const { data } = matter(raw)

    return {
      title: data.title ?? slug,
      slug,
      description: data.description ?? '',
      date: data.date ? String(data.date) : '',
      tags: data.tags ?? [],
    } satisfies GuideMeta
  })

  return guides.sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getGuideBySlug(slug: string): { meta: GuideMeta; content: string } {
  const guidesDir = path.join(CONTENT_DIR, 'guides')
  const extensions = ['.mdx', '.md']
  let raw = ''

  for (const ext of extensions) {
    const filePath = path.join(guidesDir, `${slug}${ext}`)
    if (fs.existsSync(filePath)) {
      raw = fs.readFileSync(filePath, 'utf8')
      break
    }
  }

  if (!raw) throw new Error(`Guide not found: ${slug}`)

  const { data, content } = matter(raw)

  const meta: GuideMeta = {
    title: data.title ?? slug,
    slug,
    description: data.description ?? '',
    date: data.date ? String(data.date) : '',
    tags: data.tags ?? [],
  }

  return { meta, content }
}
