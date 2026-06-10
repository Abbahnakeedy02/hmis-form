import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/hmis-form/' to match your GitHub repository name exactly
// Example: if your repo is github.com/yourname/my-hmis → base: '/my-hmis/'
export default defineConfig({
  plugins: [react()],
  base: '/hmis-form/',
})
