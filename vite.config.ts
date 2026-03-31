import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

declare const process: { env?: Record<string,string | undefined> } | undefined;

const target = process?.env?.BUILD_TARGET;
const base = target === 'azure' ? '/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 8173 },
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false }
})
