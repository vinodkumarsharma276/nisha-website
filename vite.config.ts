import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

declare const process: { env?: Record<string,string | undefined> } | undefined;

const repoBase = '/nisha-website/';
const isAzure = !!(process && process.env && process.env.AZURE_STATIC_WEB_APPS);

export default defineConfig({
  plugins: [react()],
  base: isAzure ? '/' : repoBase,
  server: { port: 8173 },
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false }
})
