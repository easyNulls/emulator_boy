import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { version } from './package.json'

// 根据当前工作目录中的 `mode` 加载 .env 文件
// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
// const env = loadEnv(mode, process.cwd(), '')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      __DEV__: JSON.stringify(mode),
      __PACKAGE_VERSION__: JSON.stringify(version)
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
        {
          find: '@/*',
          replacement: resolve(__dirname, 'src/*'),
        },
        {
          find: '@kits',
          replacement: resolve(__dirname, 'src/kits'),
        }, {
          find: '@assets',
          replacement: resolve(__dirname, 'src/assets'),
        }, {
          find: '@config',
          replacement: resolve(__dirname, 'src/config'),
        }, {
          find: '@pages',
          replacement: resolve(__dirname, 'src/pages'),
        },
      ],
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  }
})
