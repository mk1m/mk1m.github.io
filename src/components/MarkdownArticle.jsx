function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function inlineMarkdown(value, itemSlug) {
  return escapeHtml(value)
    .replace(/\[((?:@[A-Za-z0-9_:-]+(?:;\s*)?)+)\]/g, (_, citations) => {
      const links = citations
        .split(';')
        .map((citation) => citation.trim().replace(/^@/, ''))
        .filter(Boolean)
        .map((key) => `<a href="#${itemSlug}/ref-${key}">@${key}</a>`)
      return `<span class="citation">[${links.join('; ')}]</span>`
    })
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((cell) => cell.trim())
}

function isTableSeparator(line) {
  return /^\|?[\s:-]+\|[\s|:-]+$/.test(line.trim())
}

function flushParagraph(blocks, paragraph) {
  if (!paragraph.length) return
  blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
  paragraph.length = 0
}

function parseMarkdown(markdown) {
  const lines = markdown.split('\n')
  const blocks = []
  const paragraph = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph(blocks, paragraph)
      index += 1
      continue
    }

    if (trimmed.startsWith('```')) {
      flushParagraph(blocks, paragraph)
      const language = trimmed.slice(3).trim()
      const code = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        code.push(lines[index])
        index += 1
      }
      blocks.push({ type: 'code', language, text: code.join('\n') })
      index += 1
      continue
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph(blocks, paragraph)
      const quote = []
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quote.push(lines[index].trim().slice(2))
        index += 1
      }
      blocks.push({ type: 'quote', text: quote.join(' ') })
      continue
    }

    if (trimmed.startsWith('|') && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      flushParagraph(blocks, paragraph)
      const headers = parseTableRow(trimmed)
      const rows = []
      index += 2
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(parseTableRow(lines[index]))
        index += 1
      }
      blocks.push({ type: 'table', headers, rows })
      continue
    }

    if (trimmed === '$$') {
      flushParagraph(blocks, paragraph)
      const equation = []
      index += 1
      while (index < lines.length && lines[index].trim() !== '$$') {
        equation.push(lines[index])
        index += 1
      }
      blocks.push({ type: 'equation', text: equation.join('\n') })
      index += 1
      continue
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph(blocks, paragraph)
      blocks.push({ type: 'heading', level: 3, text: trimmed.slice(4) })
      index += 1
      continue
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph(blocks, paragraph)
      blocks.push({ type: 'heading', level: 2, text: trimmed.slice(3) })
      index += 1
      continue
    }

    if (trimmed.startsWith('# ')) {
      flushParagraph(blocks, paragraph)
      blocks.push({ type: 'heading', level: 1, text: trimmed.slice(2) })
      index += 1
      continue
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph(blocks, paragraph)
      const items = []
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ''))
        index += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph(blocks, paragraph)
      const items = []
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''))
        index += 1
      }
      blocks.push({ type: 'ordered-list', items })
      continue
    }

    paragraph.push(trimmed)
    index += 1
  }

  flushParagraph(blocks, paragraph)
  return blocks
}

function MarkdownBlock({ block, itemSlug }) {
  if (block.type === 'heading') {
    const Tag = `h${Math.min(block.level + 1, 4)}`
    return <Tag id={slugify(block.text)} dangerouslySetInnerHTML={{ __html: inlineMarkdown(block.text, itemSlug) }} />
  }

  if (block.type === 'code') {
    const languageClass = block.language ? ` language-${slugify(block.language)}` : ''
    return (
      <pre className={`code-block${languageClass}`}>
        <code>{block.text}</code>
      </pre>
    )
  }

  if (block.type === 'equation') {
    return <div className="equation-block">{block.text}</div>
  }

  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => {
          const reference = item.match(/^\[([A-Za-z0-9_:-]+)\]\s*(.*)/)
          if (reference) {
            const [, key, text] = reference
            return (
              <li id={`ref-${key}`} key={item}>
                <a className="reference-key" href={`#${itemSlug}/ref-${key}`}>[{key}]</a>{' '}
                <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(text, itemSlug) }} />
              </li>
            )
          }
          return <li key={item} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item, itemSlug) }} />
        })}
      </ul>
    )
  }

  if (block.type === 'ordered-list') {
    return (
      <ol>
        {block.items.map((item) => (
          <li key={item} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item, itemSlug) }} />
        ))}
      </ol>
    )
  }

  if (block.type === 'quote') {
    return <blockquote dangerouslySetInnerHTML={{ __html: inlineMarkdown(block.text, itemSlug) }} />
  }

  if (block.type === 'table') {
    return (
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header} dangerouslySetInnerHTML={{ __html: inlineMarkdown(header, itemSlug) }} />
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${row.join('-')}-${rowIndex}`}>
                {block.headers.map((header, cellIndex) => (
                  <td key={`${header}-${cellIndex}`} dangerouslySetInnerHTML={{ __html: inlineMarkdown(row[cellIndex] || '', itemSlug) }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <p dangerouslySetInnerHTML={{ __html: inlineMarkdown(block.text, itemSlug) }} />
}

export default function MarkdownArticle({ item }) {
  const blocks = parseMarkdown(item.body || '')

  return (
    <article className="article-template writing-article">
      <header className="article-header">
        <p className="entry-label">{item.type}</p>
        <h1>{item.title}</h1>
        {item.summary && <p>{item.summary}</p>}
        <div className="article-meta-row">
          {item.date && <span>{item.date}</span>}
          {item.status && <span>{item.status}</span>}
        </div>
        <TagLinks
          tags={item.tags}
          basePath={item.type === 'Blog post' ? './blog-posts.html' : './research-notes.html'}
        />
      </header>

      <div className="markdown-body">
        {blocks.map((block, index) => (
          <MarkdownBlock block={block} itemSlug={item.slug} key={`${block.type}-${index}`} />
        ))}
      </div>

      {(item.github || item.notebook) && (
        <footer className="article-links">
          {item.github && (
            <a href={item.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {item.notebook && (
            <a href={item.notebook} target="_blank" rel="noreferrer">
              Notebook
            </a>
          )}
        </footer>
      )}
    </article>
  )
}
import TagLinks from './TagLinks'
