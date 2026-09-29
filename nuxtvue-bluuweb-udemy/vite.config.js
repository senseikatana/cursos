import tsconfigPaths from "vite-tsconfig-paths";
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), vue()],
})
