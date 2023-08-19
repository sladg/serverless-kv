import type { Options } from 'tsup'

export default <Options>{
  entryPoints: ['lib/index.ts'],
  clean: true,
  format: ['cjs'],
  dts: true,
  sourcemap: true,
  minify: false,
}
