import { defineConfig } from 'vite'

export default defineConfig({
  // Si el sitio vive en la raíz del dominio deja base: '/'
  // Si vive en un subdirectorio cambia a: base: '/subdir/'
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Múltiples páginas HTML
      input: {
        main:        'index.html',
        marketplace: 'marketplace.html',
        tactiq:      'tactiq.html',
      },
    },
  },
})
