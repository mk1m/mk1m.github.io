const researchNoteFiles = import.meta.glob('./research-notes/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const blogPostFiles = import.meta.glob('./blog-posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

export const tagCatalog = [
  'mechanistic interpretability',
  'transformers',
  'activation steering',
  'alignment',
  'evaluations',
  'representation engineering',
]

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

function parseValue(value) {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }
  if (trimmed.includes(',') && !trimmed.startsWith('http')) {
    return trimmed.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return trimmed.replace(/^['"]|['"]$/g, '')
}

function parseFrontmatter(raw, fallbackSlug) {
  if (!raw.startsWith('---')) {
    return {
      meta: { title: fallbackSlug, slug: fallbackSlug, tags: [] },
      body: raw.trim(),
    }
  }

  const end = raw.indexOf('\n---', 3)
  if (end === -1) {
    return {
      meta: { title: fallbackSlug, slug: fallbackSlug, tags: [] },
      body: raw.trim(),
    }
  }

  const frontmatter = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).trim()
  const meta = frontmatter.split('\n').reduce((acc, line) => {
    const separator = line.indexOf(':')
    if (separator === -1) return acc
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1)
    acc[key] = parseValue(value)
    return acc
  }, {})

  return {
    meta: {
      title: fallbackSlug,
      slug: fallbackSlug,
      tags: [],
      ...meta,
    },
    body,
  }
}

function loadCollection(files, type) {
  return Object.entries(files)
    .filter(([path]) => !slugFromPath(path).startsWith('_'))
    .map(([path, raw]) => {
      const slug = slugFromPath(path)
      const { meta, body } = parseFrontmatter(raw, slug)
      return {
        ...meta,
        type: meta.type || type,
        body,
        slug: meta.slug || slug,
        summary: meta.summary || '',
        tags: Array.isArray(meta.tags) ? meta.tags : [],
      }
    })
    .filter((item) => !item.draft)
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
}

export const researchNotes = loadCollection(researchNoteFiles, 'Research note')
export const blogPosts = loadCollection(blogPostFiles, 'Blog post')
