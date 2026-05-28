import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        blog: resolve(rootDir, 'blog.html'),
        researchNotes: resolve(rootDir, 'research-notes.html'),
        blogPosts: resolve(rootDir, 'blog-posts.html'),
      },
    },
  },
})
