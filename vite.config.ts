import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig, type Plugin, type UserConfig } from 'vite';

import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { checker } from 'vite-plugin-checker';
import UnoCSS from 'unocss/vite';

export default defineConfig(({ command, mode }): UserConfig => {
  const config: UserConfig = {
    base: './',
    define: { 'process.env': {} },
    plugins: [
      vue(),
      checker({
        typescript: false,
      }),
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      ElementPlus({
        useSource: false,
        ignoreComponents: [],
      }),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: '@use "@/styles/element/index.scss" as *;',
        },
      },
    },
  };
  return config;
});
