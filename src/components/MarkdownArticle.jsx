function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
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

    if (trimmed.startsWith('- ')) {
      flushParagraph(blocks, paragraph)
      const items = []
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2))
        index += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }

    paragraph.push(trimmed)
    index += 1
  }

  flushParagraph(blocks, paragraph)
  return blocks
}

function MarkdownBlock({ block }) {
  if (block.type === 'heading') {
    const Tag = `h${Math.min(block.level + 1, 4)}`
    return <Tag>{block.text}</Tag>
  }

  if (block.type === 'code') {
    return (
      <pre className="code-block">
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
        {block.items.map((item) => (
          <li key={item} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
        ))}
      </ul>
    )
  }

  return <p dangerouslySetInnerHTML={{ __html: inlineMarkdown(block.text) }} />
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
          <MarkdownBlock block={block} key={`${block.type}-${index}`} />
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
