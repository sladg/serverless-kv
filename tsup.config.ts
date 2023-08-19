import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['lib/index.ts'],
  clean: true,
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: true,
  minify: false,
  skipNodeModulesBundle: true,
  external: ['node_modules'],
})
