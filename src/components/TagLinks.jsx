function tagsToSearch(tags) {
  const params = new URLSearchParams()
  tags.forEach((tag) => params.append('tag', tag))
  const search = params.toString()
  return search ? `?${search}` : ''
}

export function tagsHref(basePath, tags) {
  return `${basePath}${tagsToSearch(tags)}`
}

export function tagHref(basePath, tag, selectedTags = []) {
  const nextTags = selectedTags.includes(tag) ? selectedTags : [...selectedTags, tag]
  return tagsHref(basePath, nextTags)
}

export function removeTagHref(basePath, tag, selectedTags = []) {
  return tagsHref(basePath, selectedTags.filter((selectedTag) => selectedTag !== tag))
}

export function tagsFromSearch(search) {
  return [...new Set(new URLSearchParams(search).getAll('tag'))]
}

export function ActiveTagFilters({ selectedTags, path }) {
  if (!selectedTags.length) return null

  return (
    <div className="active-filter-panel" aria-label="Active tag filters">
      <p>Filtering by</p>
      <div className="active-tag-list">
        {selectedTags.map((tag) => (
          <a href={removeTagHref(path, tag, selectedTags)} key={tag}>
            <span aria-hidden="true">x</span>
            {tag}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function TagLinks({ tags, basePath, selectedTags = [] }) {
  if (!tags?.length) return null

  return (
    <div className="tag-cloud" aria-label="Tags">
      {tags.map((tag) => (
        <a
          className={selectedTags.includes(tag) ? 'is-active' : undefined}
          href={tagHref(basePath, tag, selectedTags)}
          key={tag}
        >
          {tag}
        </a>
      ))}
    </div>
  )
}
