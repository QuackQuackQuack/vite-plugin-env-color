import { resolve } from 'path'
import { loadEnv } from 'vite';
import type { Plugin } from 'vite'
import { makeFiles } from './utils/file';
import { snakeToCamelCase } from './utils/string';

export interface VitePluginEnvColor {
  ENV_FILTER_NAME?: string;
  TS_FILE_NAME?: string;
  TS_BASE_PATH?: string;
  CSS_FILE_NAME?: string;
  CSS_BASE_PATH?: string;
  SCSS_FILE_NAME?: string;
  SCSS_BASE_PATH?: string;
  IS_BUILD_JS?: boolean;
  IS_BUILD_CSS?: boolean;
  IS_BUILD_SCSS?: boolean;
}

export default function vitePluginEnvColor(props: VitePluginEnvColor = {}): Plugin  {
  const { 
    ENV_FILTER_NAME = 'VITE_COLOR_', 
    TS_FILE_NAME = 'color',  
    TS_BASE_PATH = './src',
    CSS_FILE_NAME = 'color',  
    CSS_BASE_PATH = './public/css',
    SCSS_FILE_NAME = 'color',  
    SCSS_BASE_PATH = './src/assets',
    IS_BUILD_JS = true,
    IS_BUILD_CSS = true,
    IS_BUILD_SCSS = true,
  } = props;

  return {
    name: 'vite-plugin-env-color',
    config ({ root = process.cwd(), envDir }, { mode }) {
      const resolvedRoot = resolve(root)
      envDir = envDir ? resolve(resolvedRoot, envDir) : resolvedRoot
      const env = loadEnv(mode, envDir, '');
      const regExp = new RegExp(`${ENV_FILTER_NAME}`);
      const filteredColor = Object.fromEntries(
        Object.entries(env).filter(([key]) => {
          return key.match(regExp);
        }),
      );
      const data = Object.keys(filteredColor)?.map((item, index) => {
        return {
          name: snakeToCamelCase(item.split(ENV_FILTER_NAME)[1]),
          value: `#${filteredColor[item]}`,
          last: index === Object.keys(filteredColor).length - 1,
        }
      });

      if (data?.length) {
        makeFiles({
          data,
          TS_FILE_NAME,
          TS_BASE_PATH,
          CSS_FILE_NAME, 
          CSS_BASE_PATH,
          SCSS_FILE_NAME,
          SCSS_BASE_PATH,
          IS_BUILD_JS,
          IS_BUILD_CSS,
          IS_BUILD_SCSS,
        });
      }
    },
  }
}
