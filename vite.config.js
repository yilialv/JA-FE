import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from  "tailwindcss"
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss, 
    autoprefixer,],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src")
    }
  }
})
