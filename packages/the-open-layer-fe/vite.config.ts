import { UserConfigExport, UserConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import svgr from 'vite-plugin-svgr';
import { viteVConsole } from 'vite-plugin-vconsole';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  console.log({ mode });
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: true,
          titleProp: true,
        },
      }),
      viteVConsole({
        entry: path.resolve('src/main.tsx'),
        enabled: mode === 'staging',
        config: {
          maxLogNumber: 1000,
          theme: 'dark',
        },
      }),
    ] as UserConfig['plugins'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        buffer: 'buffer/',
      },
    },
  };
};
